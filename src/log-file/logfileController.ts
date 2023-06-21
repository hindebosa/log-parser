import {
  Controller,
  Post,
  UploadedFile,
  UseInterceptors,
} from '@nestjs/common';
import { FileInterceptor } from '@nestjs/platform-express';
import * as fs from 'fs';

@Controller('log')
export class LogFileController {
  @Post('parse')
  @UseInterceptors(FileInterceptor('file'))
  async parseLogFile(@UploadedFile() file: Express.Multer.File) {
    // Implement log parsing logic here
    try {
      const readFileFromFolder = async (filePath: string): Promise<string> => {
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

      const filePath = './src/log-file/transaction.log';
      const logContent = await readFileFromFolder(filePath);

      // const logContent = file.buffer.toString('utf8');

      const regex = /Primary Account Number.*?(?=Primary Account Number|$)/gs;
      const extractedData = logContent.match(regex).map((item) => item.trim());

      const newArray = [];

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
        const regexTimeLocalTransaction = /12:Time, Local Transaction = <(.+?)>/;
        const regexDateLocalTransaction = /3:Date, Local Transaction = <(.+?)>/;
        const regexDateExpiration = /14:Date, Expiration = <(.+?)>/;
        const regexDateCapture = /17:Date, Capture = <(.+?)>/;
        const regexMerchantType = /18:Merchant Type = <(.+?)>/;
        const regexPOSEntryMode = /22:POS Entry Mode = <(.+?)>/;
        const regexCardSequenceNumber = /23:Card Sequence Number = <(.+?)>/;
        const regexPOSConditionCode = /25:POS Condition Code = <(.+?)>/;
        const regexAcquiringInstitutionIdCode = /32:Acquiring Institution Id Code = <(.+?)>/;
        const regexTrack2Data = /35:Track 2 Data = <(.+?)>/;
        const regexRetrievalReferenceNumber = /37:Retrieval Reference Number = <(.+?)>/;
        const regexResponseCode = /39:Response Code = <(.+?)>/;
        const regexServiceRestrictionCode = /40:Service Restriction Code = <(.+?)>/;
        const regexCardAcceptorTerminalId = /41:Card Acceptor Terminal Id = <(.+?)>/;
        const regexCardAcceptorIdCode = /42:Card Acceptor Id Code = <(.+?)>/;
        const regexCurrencyCodeTransaction = /49:Currency Code, Transaction = <(.+?)>/;
        const regexReceivingInstitutionIdentificationCode = /100:Receiving Institution Identification Code = <(.+?)>/;
        const regexTerminalType = /130.0:Terminal Type = <(.+?)>/;
        const regexTerminalLocation = /130.1:Terminal Location =  <(.+?)>/;
        const regexPINEntryDevice = /130.2:PIN Entry Device = <(.+?)>/;
        const regexTerminalOperator = /130.3:Terminal Operator = <(.+?)>/;
        const regexPINCaptureCapability = /130.4:PIN Capture Capability =  <(.+?)>/;
        const regexCardCapture = /130.5:Card Capture = <(.+?)>/;
        const regexTerminalCardholderAuthenticationCapability = /130.6:Terminal Cardholder Authentication Capability = <(.+?)>/;
        const regexTerminalOutputCapability = /30.7:Terminal Output Capability =  <(.+?)>/;
        const regexCardPresent = /131.0:Card Present = <(.+?)>/;
        const regexCardDataCaptureCapability = /131.1:Card Data Capture Capability = <(.+?)>/;
        const regexCardDataCaptureMethod = /131.2:Card Data Capture Method =  <(.+?)>/;
        const regexCardDataOutputCapability = /131.3:Card Data Output Capability = <(.+?)>/;
        const regexCardholderPresent = /132.0:Cardholder Present = <(.+?)>/;
        const regexCardholderAuthenticationMethod = /132.1:Cardholder Authentication Method = <(.+?)>/;
        const regexCardholderAuthenticationEntity = /132.2:Cardholder Authentication Entity =  <(.+?)>/;
        const regexSessionID = /135:Session ID = <(.+?)>/;
        const regexUUID = /137:UUID = <(.+?)>/;
        const regexEchoData = /138:Echo Data = <(.+?)>/;
        const regexPrimaryAccountNumberSanitised = /144:Primary Account Number, Sanitised = <(.+?)>/;
        const regexAmountAuthorized = /150.1:Amount Authorized =  <(.+?)>/;
        const regexAmountOther = /150.2:Amount Other =  <(.+?)>/;
        const regexApplicationIdentifier = /150.3:Application Identifier =  <(.+?)>/;
        const regexApplicationInterchangeProfile = /150.4:Application Interchange Profile = <(.+?)>/;
        const regexApplicationTransactionCounter = /150.5:Application Transaction Counter = <(.+?)>/;
        const regexApplicationUsageControl = /150.6:Application Usage Control = <(.+?)>/;
        const regexCryptogram =/150.11:Cryptogram = <(.+?)>/;
        const regexCryptogramInformationData = /150.12:Cryptogram Information Data = <(.+?)>/;
        const regexCVMResults = /150.14:CVM Results = <(.+?)>/;
        const regexInterfaceDeviceSerialNumber = /150.15:Interface Device Serial Number = <(.+?)>/;
        const regexIssuerActionCode = /150.16:Issuer Action Code = <(.+?)>/;
        const regexIssuerApplicationData = /150.17:Issuer Application Data = <(.+?)>/;
        const regexTerminalApplicationVersionNumber = /150.19:Terminal Application Version Number = <(.+?)>/;
        const regexTerminalCapabilities = /150.20:Terminal Capabilities = <(.+?)>/;
        const regexTerminalCountryCode = /150.21:Terminal Country Code = <(.+?)>/;
        const regexTerminalVerificationResult = /150.23:Terminal Verification Result = <(.+?)>/;
        const regexTransactionCurrencyCode = /150.25:Transaction Currency Code = <(.+?)>/;
        const regexTransactionDate = /150.26:Transaction Date = <(.+?)>/;
        const regexUnpredictableNumber = /150.29:Unpredictable Number = <(.+?)>/;
        const regexTransactionStatusInformation = /150.33:Transaction Status Information = <(.+?)>/;
        const regexApplicationLabel = /150.34:Application Label = <(.+?)>/;
        const regexDesignator = /168.1[0].1:Designator = <(.+?)>/;
        const regexSerialNumber = /168.1[0].2:Serial Number = <(.+?)>/;
        const regexVendor = /168.1[0].3:Vendor = <(.+?)>/;
        const regexDeviceModel = /168.1[0].4:Device Model = <(.+?)>/;
    
    

// 130:Card Acceptor Terminal Profile Sub Message
// 131:Card Profile Sub Message
// 132:Cardholder Profile Sub Message
// 150:EMV Data Sub Message
// 153:Additional Data Elements Sub Message
// 153.63:Miscellaneous = <CLIENTREF;UQTSNJRJSPUHZKQQJU:CAAD;,,OK GROCER JAN KEMPDORP (COB) - ARCH,51 Grens Straat Jan Kempdorp,,BLOMTUIN EST,UNK,,NC,ZA,7530,,,,,>
// 168:Peripheral Device Information Sub Message
// 168.1[]:Peripheral Device Information Records Array
// 168.1[0]:Peripheral Device Information Records Sub Message
// 170:Message Transit Data Sub Message
// 170.0[]:Module Name Data Array
// 170.0[0]:Module Name Data = <InnervationPSP.OKGrocer.JanKempdorp.Appliance01>
// 170.0[1]:Module Name Data = <InnervationPSP.PSP.DMZ.TransactionRouter3>
// 170.0[2]:Module Name Data = <InnervationPSP.PSP.Secure.MerchantAccessPoint>
// 170.0[3]:Module Name Data = <InnervationPSP.PSP.Secure.EftSwitch>
// 170.0[4]:Module Name Data = <InnervationPSP.PSP.Interconnect.BankRouterNedbankPostbridge>
// 170.1[]:Module Stamp Data Array
// 170.1[0]:Module Stamp Data Sub Message


// 170.1[0].0:Message Transit Direction = <Tx>
// 170.1[0].1:Message Transit TimeStamp = <6731587>
// 170.1[0].2:Module Public Name Index = <00>
// 170.1[1]:Module Stamp Data Sub Message
// 170.1[1].0:Message Transit Direction = <Rx>
// 170.1[1].1:Message Transit TimeStamp = <6731613>
// 170.1[1].2:Module Public Name Index = <01>
// 170.1[2]:Module Stamp Data Sub Message
// 170.1[2].0:Message Transit Direction = <Tx>
// 170.1[2].1:Message Transit TimeStamp = <6731613>
// 170.1[2].2:Module Public Name Index = <01>
// 170.1[3]:Module Stamp Data Sub Message
// 170.1[3].0:Message Transit Direction = <Rx>
// 170.1[3].1:Message Transit TimeStamp = <6731628>
// 170.1[3].2:Module Public Name Index = <02>
// 170.1[4]:Module Stamp Data Sub Message
// 170.1[4].0:Message Transit Direction = <Tx>
// 170.1[4].1:Message Transit TimeStamp = <6731675>
// 170.1[4].2:Module Public Name Index = <02>
// 170.1[5]:Module Stamp Data Sub Message
// 170.1[5].0:Message Transit Direction = <Rx>
// 170.1[5].1:Message Transit TimeStamp = <6731659>
// 170.1[5].2:Module Public Name Index = <03>
// 170.1[6]:Module Stamp Data Sub Message
// 170.1[6].0:Message Transit Direction = <Tx>
// 170.1[6].1:Message Transit TimeStamp = <6732440>
// 170.1[6].2:Module Public Name Index = <03>
// 170.1[7]:Module Stamp Data Sub Message
// 170.1[7].0:Message Transit Direction = <Rx>
// 170.1[7].1:Message Transit TimeStamp = <6732455>
// 170.1[7].2:Module Public Name Index = <04>
// 170.2:Module Stamp Data Current Index = <07>
// 170.3:Message Leg Transit TimeStamp = <6731587>
// 171:Original Data Elements Extended Sub Message
// 171.36:Original Acquiring Institution Id Code = <4768954000>
// 172:Replacement Elements Extended Sub Message
// 172.3:Replacement Acquiring Institution Identification Code = <4768954001>

        const accountNumberMatch = extracted.match(regexAccountNumber);
        const transactionTypeMatch = extracted.match(regexTransactionType);
        const fromAccountTypeMatch = extracted.match(regexFromAccountType);
        const toAccountTypeMatch = extracted.match(regexToAccountType);
        const timeLocalTransactionMatch = extracted.match(regexTimeLocalTransaction);
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
        const timeLocalTransaction= timeLocalTransactionMatch ? timeLocalTransactionMatch[1] : null;

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
          timeLocalTransaction,
        });

        // return { accountNumber, transactionType };
      });
      // console.log(newArray);
      const filteredArray = newArray.filter((obj) => {
        for (const key in obj) {
          if (obj[key] === null && obj.accountNumber!=="4451430000000009196") {
            return false;
          }
        }
        return true;
      });

      return filteredArray;
    } catch (e) {
      console.log(e);
    }
  }
}
