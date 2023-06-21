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

      // const filePath = './src/log-file/transaction.log';
      // const logContent = await readFileFromFolder(filePath);

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

      const logContent = file.buffer.toString("utf8");

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
        const regexTimeLocalTransaction =
          /12:Time, Local Transaction = <(.+?)>/;
        const regexDateLocalTransaction = /3:Date, Local Transaction = <(.+?)>/;
        const regexDateExpiration = /14:Date, Expiration = <(.+?)>/;
        const regexDateCapture = /17:Date, Capture = <(.+?)>/;
        const regexMerchantType = /18:Merchant Type = <(.+?)>/;
        const regexPOSEntryMode = /22:POS Entry Mode = <(.+?)>/;
        const regexCardSequenceNumber = /23:Card Sequence Number = <(.+?)>/;
        const regexPOSConditionCode = /25:POS Condition Code = <(.+?)>/;
        const regexAcquiringInstitutionIdCode =
          /32:Acquiring Institution Id Code = <(.+?)>/;
        const regexTrack2Data = /35:Track 2 Data = <(.+?)>/;
        const regexRetrievalReferenceNumber =
          /37:Retrieval Reference Number = <(.+?)>/;
        const regexResponseCode = /39:Response Code = <(.+?)>/;
        const regexServiceRestrictionCode =
          /40:Service Restriction Code = <(.+?)>/;
        const regexCardAcceptorTerminalId =
          /41:Card Acceptor Terminal Id = <(.+?)>/;
        const regexCardAcceptorIdCode = /42:Card Acceptor Id Code = <(.+?)>/;
        const regexCurrencyCodeTransaction =
          /49:Currency Code, Transaction = <(.+?)>/;
        const regexReceivingInstitutionIdentificationCode =
          /100:Receiving Institution Identification Code = <(.+?)>/;
        const regexTerminalType = /130.0:Terminal Type = <(.+?)>/;
        const regexTerminalLocation = /130.1:Terminal Location =  <(.+?)>/;
        const regexPINEntryDevice = /130.2:PIN Entry Device = <(.+?)>/;
        const regexTerminalOperator = /130.3:Terminal Operator = <(.+?)>/;
        const regexPINCaptureCapability =
          /130.4:PIN Capture Capability =  <(.+?)>/;
        const regexCardCapture = /130.5:Card Capture = <(.+?)>/;
        const regexTerminalCardholderAuthenticationCapability =
          /130.6:Terminal Cardholder Authentication Capability = <(.+?)>/;
        const regexTerminalOutputCapability =
          /30.7:Terminal Output Capability =  <(.+?)>/;
        const regexCardPresent = /131.0:Card Present = <(.+?)>/;
        const regexCardDataCaptureCapability =
          /131.1:Card Data Capture Capability = <(.+?)>/;
        const regexCardDataCaptureMethod =
          /131.2:Card Data Capture Method =  <(.+?)>/;
        const regexCardDataOutputCapability =
          /131.3:Card Data Output Capability = <(.+?)>/;
        const regexCardholderPresent = /132.0:Cardholder Present = <(.+?)>/;
        const regexCardholderAuthenticationMethod =
          /132.1:Cardholder Authentication Method = <(.+?)>/;
        const regexCardholderAuthenticationEntity =
          /132.2:Cardholder Authentication Entity =  <(.+?)>/;
        const regexSessionID = /135:Session ID = <(.+?)>/;
        const regexUUID = /137:UUID = <(.+?)>/;
        const regexEchoData = /138:Echo Data = <(.+?)>/;
        const regexPrimaryAccountNumberSanitised =
          /144:Primary Account Number, Sanitised = <(.+?)>/;
        const regexAmountAuthorized = /150.1:Amount Authorized =  <(.+?)>/;
        const regexAmountOther = /150.2:Amount Other =  <(.+?)>/;
        const regexApplicationIdentifier =
          /150.3:Application Identifier =  <(.+?)>/;
        const regexApplicationInterchangeProfile =
          /150.4:Application Interchange Profile = <(.+?)>/;
        const regexApplicationTransactionCounter =
          /150.5:Application Transaction Counter = <(.+?)>/;
        const regexApplicationUsageControl =
          /150.6:Application Usage Control = <(.+?)>/;
        const regexCryptogram = /150.11:Cryptogram = <(.+?)>/;
        const regexCryptogramInformationData =
          /150.12:Cryptogram Information Data = <(.+?)>/;
        const regexCVMResults = /150.14:CVM Results = <(.+?)>/;
        const regexInterfaceDeviceSerialNumber =
          /150.15:Interface Device Serial Number = <(.+?)>/;
        const regexIssuerActionCode = /150.16:Issuer Action Code = <(.+?)>/;
        const regexIssuerApplicationData =
          /150.17:Issuer Application Data = <(.+?)>/;
        const regexTerminalApplicationVersionNumber =
          /150.19:Terminal Application Version Number = <(.+?)>/;
        const regexTerminalCapabilities =
          /150.20:Terminal Capabilities = <(.+?)>/;
        const regexTerminalCountryCode =
          /150.21:Terminal Country Code = <(.+?)>/;
        const regexTerminalVerificationResult =
          /150.23:Terminal Verification Result = <(.+?)>/;
        const regexTransactionCurrencyCode =
          /150.25:Transaction Currency Code = <(.+?)>/;
        const regexTransactionDate = /150.26:Transaction Date = <(.+?)>/;
        const regexUnpredictableNumber =
          /150.29:Unpredictable Number = <(.+?)>/;
        const regexTransactionStatusInformation =
          /150.33:Transaction Status Information = <(.+?)>/;
        const regexApplicationLabel = /150.34:Application Label = <(.+?)>/;
        const regexDesignator = /168.1[0].1:Designator = <(.+?)>/;
        const regexSerialNumber = /168.1[0].2:Serial Number = <(.+?)>/;
        const regexVendor = /168.1[0].3:Vendor = <(.+?)>/;
        const regexDeviceModel = /168.1[0].4:Device Model = <(.+?)>/;

        const dateExpirationMatch = extracted.match(regexDateExpiration);
        const dateLocalTransactionMatch = extracted.match(
          regexDateLocalTransaction
        );
        const accountNumberMatch = extracted.match(regexAccountNumber);
        const transactionTypeMatch = extracted.match(regexTransactionType);
        const fromAccountTypeMatch = extracted.match(regexFromAccountType);
        const toAccountTypeMatch = extracted.match(regexToAccountType);
        const timeLocalTransactionMatch = extracted.match(
          regexTimeLocalTransaction
        );
        const track2DataMatch = extracted.match(regexTrack2Data);
        const posConditionCodeMatch = extracted.match(regexPOSConditionCode);
        const cardSequenceNumberMatch = extracted.match(
          regexCardSequenceNumber
        );
        const POSEntryModeMatch = extracted.match(regexPOSEntryMode);
        const merchantTypeMatch = extracted.match(regexMerchantType);
        const dateCaptureMatch = extracted.match(regexDateCapture);
        const amountTransactionMatch = extracted.match(regexAmountTransaction);
        const transmissionDateTimeMatch = extracted.match(
          regexTransmissionDateTime
        );
        const systemsTraceAuditNumberMatch = extracted.match(
          regexSystemsTraceAuditNumber
        );
        const cardAcceptorNameLocationMatch = extracted.match(
          regexCardAcceptorNameLocation
        );
        const pINEntryDeviceMatch = extracted.match(regexPINEntryDevice);
        const cardAcceptorIdCodeMatch = extracted.match(
          regexCardAcceptorIdCode
        );
        const pINCaptureCapabilityMatch = extracted.match(
          regexPINCaptureCapability
        );
        const terminalOperatorMatch = extracted.match(regexTerminalOperator);
        const terminalLocationMatch = extracted.match(regexTerminalLocation);

        const retrievalReferenceNumberMatch = extracted.match(
          regexRetrievalReferenceNumber
        );
        const cardPresentMatch = extracted.match(regexCardPresent);
        const currencyCodeTransactionMatch = extracted.match(
          regexCurrencyCodeTransaction
        );

        const cardAcceptorTerminalIdMatch = extracted.match(
          regexCardAcceptorTerminalId
        );
        const serviceRestrictionCodeMatch = extracted.match(
          regexServiceRestrictionCode
        );
        const responseCodeMatch = extracted.match(regexResponseCode);
        const terminalCardholderAuthenticationCapabilityMatch = extracted.match(
          regexTerminalCardholderAuthenticationCapability
        );
        const cardholderAuthenticationMethodMatch = extracted.match(
          regexCardholderAuthenticationMethod
        );
        const cardDataCaptureCapabilityMatch = extracted.match(
          regexCardDataCaptureCapability
        );
        const cardCaptureMatch = extracted.match(regexCardCapture);
        const issuerApplicationDataMatch = extracted.match(
          regexIssuerApplicationData
        );
        const primaryAccountNumberSanitisedMatch = extracted.match(
          regexPrimaryAccountNumberSanitised
        );
        const cardDataCaptureMethodMatch = extracted.match(
          regexCardDataCaptureMethod
        );
        const cardholderAuthenticationEntityMatch = extracted.match(
          regexCardholderAuthenticationEntity
        );
        const xAcquiringInstitutionIdCodeMatch = extracted.match(
          regexAcquiringInstitutionIdCode
        );
        const uUIDMatch = extracted.match(regexUUID);

        const applicationTransactionCounterMatch = extracted.match(
          regexApplicationTransactionCounter
        );
        const terminalCapabilitiesMatch = extracted.match(
          regexTerminalCapabilities
        );
        const cVMResultsMatch = extracted.match(regexCVMResults);
        const cryptogramInformationDataMatch = extracted.match(
          regexCryptogramInformationData
        );

        const applicationInterchangeProfileMatch = extracted.match(
          regexApplicationInterchangeProfile
        );
        const designatorMatch = extracted.match(regexDesignator);
        const terminalApplicationVersionNumberMatch = extracted.match(
          regexTerminalApplicationVersionNumber
        );
        const vendorMatch = extracted.match(regexVendor);
        const serialNumberMatch = extracted.match(regexSerialNumber);
        const unpredictableNumberMatch = extracted.match(
          regexUnpredictableNumber
        );
        const deviceModelMatch = extracted.match(regexDeviceModel);
        const applicationLabelMatch = extracted.match(regexApplicationLabel);
        const transactionStatusInformationMatch = extracted.match(
          regexTransactionStatusInformation
        );
        const transactionDateMatch = extracted.match(regexTransactionDate);
        const transactionCurrencyCodeMatch = extracted.match(
          regexTransactionCurrencyCode
        );
        const terminalVerificationResultMatch = extracted.match(
          regexTerminalVerificationResult
        );
        const terminalCountryCodeMatch = extracted.match(
          regexTerminalCountryCode
        );
        const cryptogramMatch = extracted.match(regexCryptogram);
        const applicationUsageControlMatch = extracted.match(
          regexApplicationUsageControl
        );
        const issuerActionCodeMatch = extracted.match(regexIssuerActionCode);
        const interfaceDeviceSerialNumberMatch = extracted.match(
          regexInterfaceDeviceSerialNumber
        );
        const terminalTypeMatch = extracted.match(regexTerminalType);
        const receivingInstitutionIdentificationCodeMatch = extracted.match(
          regexReceivingInstitutionIdentificationCode
        );
        const cardDataOutputCapabilityMatch = extracted.match(
          regexCardDataOutputCapability
        );
        const amountOtherMatch = extracted.match(regexAmountOther);
        const amountAuthorizedMatch = extracted.match(regexAmountAuthorized);
        const echoDataMatch = extracted.match(regexEchoData);
        const cardholderPresentMatch = extracted.match(regexCardholderPresent);
        const sessionIDMatch = extracted.match(regexSessionID);
        const terminalOutputCapabilityMatch = extracted.match(
          regexTerminalOutputCapability
        );
        const applicationIdentifierMatch = extracted.match(
          regexApplicationIdentifier
        );

        //getting the objects
        const amountAuthorizedMatch = amountAuthorizedMatch
          ? amountAuthorizedMatch[1]
          : null;

        const echoData = echoDataMatch ? echoDataMatch[1] : null;
        const cardholderPresent = cardholderPresentMatch
          ? cardholderPresentMatch[1]
          : null;
        const sessionID = sessionIDMatch ? sessionIDMatch[1] : null;
        const terminalOutputCapability = terminalOutputCapabilityMatch
          ? terminalOutputCapabilityMatch[1]
          : null;
        const applicationIdentifier = applicationIdentifierMatch[1]
          ? applicationIdentifierMatch
          : null;

        const issuerApplicationData = issuerApplicationDataMatch
          ? issuerApplicationDataMatch[1]
          : null;
        const primaryAccountNumberSanitised = primaryAccountNumberSanitisedMatch
          ? primaryAccountNumberSanitisedMatch[1]
          : null;

        const cardDataCaptureMethod = cardDataCaptureMethodMatch
          ? cardDataCaptureMethodMatch[1]
          : null;
        const cardholderAuthenticationEntity =
          cardholderAuthenticationEntityMatch
            ? cardholderAuthenticationEntityMatch[1]
            : null;
        const xAcquiringInstitutionIdCode = xAcquiringInstitutionIdCodeMatch
          ? xAcquiringInstitutionIdCodeMatch[1]
          : null;
        const uUIDS = uUIDMatch ? uUIDMatch[1] : null;
        const terminalCardholderAuthenticationCapability =
          terminalCardholderAuthenticationCapabilityMatch
            ? terminalCardholderAuthenticationCapabilityMatch[1]
            : null;
        const cardholderAuthenticationMethod =
          cardholderAuthenticationMethodMatch
            ? cardholderAuthenticationMethodMatch[1]
            : null;
        const cardDataCaptureCapability = cardDataCaptureCapabilityMatch
          ? cardDataCaptureCapabilityMatch[1]
          : null;
        const cardCapture = cardCaptureMatch ? cardCaptureMatch[1] : null;
        const pINCaptureCapability = pINCaptureCapabilityMatch
          ? pINCaptureCapabilityMatch[1]
          : null;

        const currencyCodeTransaction = currencyCodeTransactionMatch
          ? currencyCodeTransactionMatch[1]
          : null;
        const terminalOperator = terminalOperatorMatch
          ? terminalOperatorMatch[1]
          : null;
        const terminalLocation = terminalLocationMatch
          ? terminalLocationMatch[1]
          : null;
        const retrievalReferenceNumber = retrievalReferenceNumberMatch
          ? retrievalReferenceNumberMatch[1]
          : null;
        const cardPresent = cardPresentMatch ? cardPresentMatch[1] : null;

        const pINEntryDevice = pINEntryDeviceMatch
          ? pINEntryDeviceMatch[1]
          : null;
        const cardAcceptorIdCode = cardAcceptorIdCodeMatch
          ? cardAcceptorIdCodeMatch[1]
          : null;

        const cardAcceptorTerminalId = cardAcceptorTerminalIdMatch
          ? cardAcceptorTerminalIdMatch[1]
          : null;
        const serviceRestrictionCode = serviceRestrictionCodeMatch
          ? serviceRestrictionCodeMatch[1]
          : null;
        const responseCode = responseCodeMatch ? responseCodeMatch[1] : null;
        const track2Data = track2DataMatch ? track2DataMatch[1] : null;
        const posConditionCode = posConditionCodeMatch
          ? posConditionCodeMatch[1]
          : null;
        const cardSequenceNumber = cardSequenceNumberMatch
          ? cardSequenceNumberMatch[1]
          : null;
        const pOSEntryMode = POSEntryModeMatch ? POSEntryModeMatch[1] : null;
        const merchantType = merchantTypeMatch ? merchantTypeMatch[1] : null;
        const dateCapture = dateCaptureMatch ? dateCaptureMatch[1] : null;
        const dateExpiration = dateExpirationMatch
          ? dateExpirationMatch[1]
          : null;

        const dateLocalTransaction = dateLocalTransactionMatch
          ? dateLocalTransactionMatch[1]
          : null;
        const timeLocalTransaction = timeLocalTransactionMatch
          ? timeLocalTransactionMatch[1]
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
          dateLocalTransaction,
          dateExpiration,
          dateCapture,
          merchantType,
          cardAcceptorIdCode,
          pOSEntryMode,
          track2Data,
          cardSequenceNumber,
          posConditionCode,
          responseCode,
          serviceRestrictionCode,
          cardAcceptorTerminalId,
        });
      });
      // console.log(newArray);
      //  = newArray.filter((obj) => {
      //   for (const key in obj) {
      //     if (
      //       obj[key] === null &&
      //       obj.accountNumber !== "4451430000000009196"
      //     ) {
      //       return false;
      //     }
      //   }
      //   return true;
      // });

      const filteredArray = newArray.filter((obj) => {
        return obj.accountNumber === "4451430000000009196";
      });

      return filteredArray;
    } catch (e) {
      console.log(e);
    }
  }
}
