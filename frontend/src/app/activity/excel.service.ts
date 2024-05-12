import { Injectable } from '@angular/core'
import * as XLSX from 'xlsx'

@Injectable({
    providedIn: 'root',
})
export class ExcelService {
    constructor() {}

    readExcelFile(file: File): Promise<any> {
        return new Promise((resolve, reject) => {
            const fileReader = new FileReader()
            fileReader.onload = (e) => {
                const data = new Uint8Array(fileReader.result as ArrayBuffer)
                const workbook = XLSX.read(data, { type: 'array' })
                const sheetName = workbook.SheetNames[0]
                const sheet = workbook.Sheets[sheetName]
                const jsonData = XLSX.utils.sheet_to_json(sheet, { raw: false })
                const dataWithoutHeader = jsonData.slice(3)
                resolve(dataWithoutHeader)
            }
            fileReader.readAsArrayBuffer(file)
        })
    }
}
