import { format } from 'date-fns';
import { NextApiRequest, NextApiResponse } from 'next';
import md5 from 'md5';
import { encode } from 'js-base64';
import request from 'service/fetch';
import { withIronSessionApiRoute } from 'iron-session/next';
import { IronSession } from 'iron-session';
import { ironOptions } from './config';
interface IresponseProps {
  statusCode: String;
  templateSMS: {
    smsMessageSid: String,
    dateCreated: String,
  };
  statusMsg?: string;
}
type Isession = IronSession & Record<string, any>;

export default withIronSessionApiRoute(sendVerifyCode, ironOptions);

async function sendVerifyCode(req: NextApiRequest, res: NextApiResponse) {
  const session: Isession = req.session;
  const { to = '', templateId = '1' } = req.body;
  const AppId = '2c94811c8853194e0188b838dccc2290';
  const AccountId = '2c94811c8853194e0188b838db822289';
  const AuthToken = '3907b320381240238c7844730ac3cf01';
  const NowDate = format(new Date(), 'yyyyMMddHHmmss');
  const SigParameter = md5(`${AccountId}${AuthToken}${NowDate}`);
  const Authorization = encode(`${AccountId}:${NowDate}`);
  const verifyCode = Math.floor(Math.random() * (9999 - 1000)) + 1000;
  const expireMinute = '5';
  const url = `https://app.cloopen.com:8883/2013-12-26/Accounts/${AccountId}/SMS/TemplateSMS?sig=${SigParameter}`;
  console.log('verifyCode=======》', verifyCode);
  const response: IresponseProps = await request.post(
    url,
    {
      to,
      templateId,
      appId: AppId,
      datas: [verifyCode, expireMinute],
    },
    {
      headers: {
        Authorization,
      },
    }
  );
  console.log('response', response);
  const { statusCode, templateSMS, statusMsg } = response;
  if (statusCode == '000000') {
    session.verifyCode = verifyCode;
    await session.save();
    res.status(200).json({
      code: 200,
      msg: statusMsg,
      data: {
        templateSMS,
      },
    });
  } else {
    res.status(200).json({
      code: statusCode,
      msg: statusMsg,
    });
  }
}
