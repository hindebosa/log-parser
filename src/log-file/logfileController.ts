import {
  Controller,
  Post,
  UploadedFile,
  UseInterceptors,
} from '@nestjs/common';
import { FileInterceptor } from '@nestjs/platform-express';
const fs = require('fs');

@Controller('log')
export class LogFileController {
  @Post('parse')
  @UseInterceptors(FileInterceptor('file'))
  async parseLogFile(@UploadedFile() file: Express.Multer.File) {
    // Implement log parsing logic here
    try {
      let readFileFromFolder = async (filePath: string): Promise<string> => {
        return new Promise<string>((resolve, reject) => {
          fs.readFile(filePath, 'utf8', (err, data) => {
            if (err) {
              reject(err);
            } else {
              resolve(data);
            }
          });
        });
      };

      const filePath = './src/log-file/transactions.log';
      const logContent = await readFileFromFolder(filePath);

      // const logContent = file.buffer.toString('utf8');

      const regex = /Primary Account Number.*?(?=Primary Account Number|$)/gs;
      const extractedData = logContent.match(regex).map((item) => item.trim());

      let newArray = [];

      extractedData.forEach((extracted) => {
        const regexAccountNumber = /Primary Account Number = <(.+?)>/;
        const regexTransactionType = /3.0:Transaction Type = <(.+?)>/;
        const regexFromAccountType = /3.1:From Account Type = <(.+?)>/;
        const regexToAccountType = /3.2:To Account Type = <(.+?)>/;
        const regexAmountTransaction = /4:Amount, Transaction = <(.+?)>/;
        const regexTransmissionDateTime =
          /7:Transmission Date and Time = <(.+?)>/;
        const regexSystemsTraceAuditNumber =
          /11:Systems Trace Audit Number = <(.+?)>/;
        const regexCardAcceptorNameLocation =
          /43:Card Acceptor Name Location = <(.+?)>/;

        const accountNumberMatch = extracted.match(regexAccountNumber);
        const transactionTypeMatch = extracted.match(regexTransactionType);
        const fromAccountTypeMatch = extracted.match(regexFromAccountType);
        const toAccountTypeMatch = extracted.match(regexToAccountType);
        const amountTransactionMatch = extracted.match(regexAmountTransaction);
        const transmissionDateTimeMatch = extracted.match(
          regexTransmissionDateTime,
        );
        const systemsTraceAuditNumberMatch = extracted.match(
          regexSystemsTraceAuditNumber,
        );
        const cardAcceptorNameLocationMatch = extracted.match(
          regexCardAcceptorNameLocation,
        );

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
        const transmissionDateTime = transmissionDateTimeMatch
          ? transmissionDateTimeMatch[1]
          : null;
        const systemsTraceAuditNumber = systemsTraceAuditNumberMatch
          ? systemsTraceAuditNumberMatch[1]
          : null;
        const cardAcceptorNameLocation = cardAcceptorNameLocationMatch
          ? cardAcceptorNameLocationMatch[1]
          : null;

        newArray.push({
          accountNumber,
          transactionType,
          fromAccountType,
          toAccountType,
          amountTransaction,
          transmissionDateTime,
          systemsTraceAuditNumber,
          cardAcceptorNameLocation,
        });

        // return { accountNumber, transactionType };
      });

      return newArray;

      // records.forEach((record, index) => {
      //   if (record.includes('Primary')) {
      //     console.log(index);
      //   }
      // });

      // const panRegex = /\b4[0-9]{12}(?:[0-9]{3})?\b/g; // Regex to extract primary account numbers (PANs)
      // const merchantTypeRegex = /18:Merchant Type = <([^>]+)>/g; // Regex to extract merchant type
      // const amountRegex = /4:Amount, Transaction = <(\d+)>/g; // Regex to extract amount and transaction
      // const transactionTypeRegex = /150.28:Transaction Type = <(\d+)>/g; // Regex to extract transaction type
      // const transactionDateRegex =
      //   /7:Transmission Date and Time = <(\d{4})(\d{2})(\d{2})(\d{2})(\d{2})(\d{2})>/g; // Regex to extract transaction date
      // const transactionCurrencyCodeRegex =
      //   /49:Currency Code, Transaction = <(\d+)>/g; // Regex to extract transaction currency code

      // const panMatches = [...logContent.matchAll(panRegex)];
      // // console.log(panMatches);
      // const panList = panMatches.map((match) => match[0]);

      // const merchantTypeMatches = [...logContent.matchAll(merchantTypeRegex)];
      // const merchantTypeList = merchantTypeMatches.map((match) => match[0]);

      // const amountMatches = [...logContent.matchAll(amountRegex)];
      // const amountList = amountMatches.map((match) => match[1]);

      // const transactionTypeMatches = [
      //   ...logContent.matchAll(transactionTypeRegex),
      // ];
      // const transactionTypeList = transactionTypeMatches.map(
      //   (match) => match[1],
      // );

      // const transactionDateMatches = [
      //   ...logContent.matchAll(transactionDateRegex),
      // ];
      // const transactionDateList = transactionDateMatches.map(
      //   (match) => match[1],
      // );

      // const transactionCurrencyCodeMatches = [
      //   ...logContent.matchAll(transactionCurrencyCodeRegex),
      // ];
      // const transactionCurrencyCodeList = transactionCurrencyCodeMatches.map(
      //   (match) => match[1],
      // );
      // console.log(panList.length);
      // console.log(merchantTypeList.length);
      // console.log(amountList.length);

      // return {
      //   primaryAccountNumbers: panList,
      //   merchantTypes: merchantTypeList,
      //   amounts: amountList,
      //   transactionTypes: transactionTypeList,
      //   transactionDates: transactionDateList,
      //   transactionCurrencyCodes: transactionCurrencyCodeList,
      // };
    } catch (e) {
      console.log(e);
    }
  }
}
