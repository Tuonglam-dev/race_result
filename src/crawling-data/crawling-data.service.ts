import { Injectable } from '@nestjs/common';
import puppeteer, { Page } from 'puppeteer';
import { RaceResultDocument, RaceResultSchema, RaceResultSchema } from 'src/schema/race_result.schema';
import { crawlingDataOutPutDTO } from './dto/crawling-data.dto';
import { Model } from 'mongoose';
import { InjectModel } from '@nestjs/mongoose'

@Injectable()
class NewCrawlingService {
  public async NewBrowser(years: number): Promise<Page> {
    const browser = await puppeteer.launch({ headless: "new" });
    const _page = await browser.newPage();

    const gotoUrl = process.env.CRAWLING_URL + years + process.env.CRAWLING_FIND;
    await _page.goto(gotoUrl);

    // Set screen size
    await _page.setViewport({ width: 1080, height: 1024 });
    return _page;
  }
}

export class CrawlingDataService {
  constructor(
    private readonly _page = new NewCrawlingService(),
    private readonly RaceResultSchema: RaceResultDocument = RaceResultSchema
  ) { };

  private async crawlingFieldName(page: Page): Promise<any> {
    const taleFieldSelector = await page.waitForSelector('.resultsarchive-table > thead > tr')
    const tableField = await taleFieldSelector?.evaluate(el => el.textContent);
    let tableFieldList = tableField.split('\n ');
    tableFieldList = tableFieldList.filter(item => item.trim());
    tableFieldList.forEach((item, index) => {
      tableFieldList[index] = item.trim();
    })
    return tableFieldList;
  }

  public async crawlingFieldData(page: Page): Promise<crawlingDataOutPutDTO[]> {
    const taleFieldSelector = await page.waitForSelector('.resultsarchive-table > tbody')
    const tableField = await taleFieldSelector?.evaluate(el => el.textContent);
    let tableDataList = tableField.split('\n ');
    tableDataList = tableDataList.filter(item => item.trim());
    tableDataList.forEach((item, index) => {
      tableDataList[index] = item.trim();
    })
    const returnData: crawlingDataOutPutDTO[] = [];
    for (let i: number = 0; i < tableDataList.length; i += 8) {
      const chunk = tableDataList.slice(i, i + 8);
      returnData.push({
        grand_prix: chunk[0],
        date: chunk[1],
        winner: chunk[2] + chunk[3],
        car: chunk[5],
        laps: parseInt(chunk[6]),
        time: chunk[7]
      });
    }
    return returnData;
  }

  public async CrawlingDataToDB(): Promise<void> {
    const start_year = parseInt(process.env.CRAWLING_START_YEAR)
    const currentYear = new Date(Date.now()).getFullYear()

    let promiseQueueData: [Promise<crawlingDataOutPutDTO[]>];

    for (let i: number = start_year; i <= currentYear; i++) {
      let pageYears = await this._page.NewBrowser(i);
      promiseQueueData.push(this.crawlingFieldData(pageYears))
    }
    const promiseQueue: Promise<any>[] = []
    await Promise.all(promiseQueueData).then((resultList) => {
      resultList.forEach((item, index) => {
        return promiseQueue.push(this.RaceResultSchema.create());
      })
    });
    await Promise.all(promiseQueue)
  }
}
