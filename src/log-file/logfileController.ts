import {
  Controller,
  Post,
  UploadedFile,
  UseInterceptors,
} from "@nestjs/common";
import { FileInterceptor } from "@nestjs/platform-express";
import * as fs from "fs";

@Controller("log")
export class LogFileController {
  @Post("parse")
  @UseInterceptors(FileInterceptor("file"))
  async parseLogFile(@UploadedFile() file: Express.Multer.File) {
    // Implement log parsing logic here
    try {
      const readFileFromFolder = async (filePath: string): Promise<string> => {
        return new Promise<string>((resolve, reject) => {
          fs.readFile(filePath, "utf8", (err, data) => {
            if (err) {
              reject(err);
            } else {
              resolve(data);
            }
          });
        });
      };

      const filePath = './src/log-file/transaction.log';
      const logContent = await readFileFromFolder(filePath);


      // const logContent = file.buffer.toString("utf8");

      const regex = /Primary Account Number.*?(?=Primary Account Number|$)/gs;
      const extractedData = logContent.match(regex).map((item) => item.trim());

      const newArray = [];

  

    extractedData.map((extracted) => {
        const regexAccountNumber = /Primary Account Number = <(.+?)>/;
        const regexTransactionType = /3.0:Transaction Type = <(.+?)>/;
      
         const regexAmountTransaction = /4:Amount, Transaction = <(.+?)>/;
         const regexDateExpiration = /14:Date, Expiration = <(.+?)>/;
        const regexDateCaptureMatch = /17:Date, Capture = <(.+?)>/;
        const regexMerchantType = /18:Merchant Type = <(.+?)>/;
       const regexFromAccountType = /3.1:From Account Type = <(.+?)>/;
        const regexCurrencyCodeTransaction =
          /49:Currency Code, Transaction = <(.+?)>/;
     
    
       
     
      
        const regexTransactionDate = /150.26:Transaction Date = <(.+?)>/;
  
       
           const regexToAccountType = /3.2:To Account Type = <(.+?)>/;
       
        const regexSerialNumber = /168.1[0].2:Serial Number = <(.+?)>/;
        const accountNumberMatch = extracted.match(regexAccountNumber);
         const transactionTypeMatch = extracted.match(regexTransactionType)
        const merchantTypeMatch = extracted.match(regexMerchantType);
        const dateCaptureMatch = extracted.match(regexDateCaptureMatch);
        const dateExpirationMatch = extracted.match(regexDateExpiration);
        const amountTransactionMatch = extracted.match(regexAmountTransaction);
        const currencyCodeTransactionMatch = extracted.match(
          regexCurrencyCodeTransaction
        );
         const toAccountTypeMatch = extracted.match(regexToAccountType);
        const fromAccountTypeMatch = extracted.match(regexFromAccountType);
        const serialNumberMatch = extracted.match(regexSerialNumber);
        const transactionDateMatch = extracted.match(regexTransactionDate);
        const serialNumber = serialNumberMatch ? serialNumberMatch[1] : null;
        const transactionDate = transactionDateMatch
          ? transactionDateMatch[1]
          : null;
          const currencyCodeTransaction = currencyCodeTransactionMatch
          ? currencyCodeTransactionMatch[1]
          : null;
         const merchantType = merchantTypeMatch ? merchantTypeMatch[1] : null;
        const dateCapture = dateCaptureMatch ? dateCaptureMatch[1] : null;
        const dateExpiration = dateExpirationMatch
          ? dateExpirationMatch[1]
          : null;


        const accountNumber = accountNumberMatch ? accountNumberMatch[1] : null;
        const transactionType = transactionTypeMatch
          ? transactionTypeMatch[1]
          : null;
        const fromAccountType = fromAccountTypeMatch
          ? fromAccountTypeMatch[1]
          : null;
         const toAccountType = toAccountTypeMatch ? toAccountTypeMatch[1] : null;
        const amountTransaction = amountTransactionMatch
          ? amountTransactionMatch[1]
          : null;
  
        newArray.push({
          accountNumber,
          transactionType,
          currencyCodeTransaction,
          fromAccountType,
          toAccountType,
          amountTransaction,
          dateExpiration,
          dateCapture,
          merchantType,
          transactionDate,
   
        });
      });
      const filteredArray = newArray.filter((obj) => {
        return obj.accountNumber !== null;
      });
      return filteredArray
    } catch (e) {
      console.log(e);
    }
  }
}
