import { NextResponse } from 'next/server';
import { decrypt } from '@/lib/ccavenue';
import querystring from 'querystring';

export async function POST(req) {
  try {
    const formData = await req.formData();
    const encResp = formData.get('encResp');
    const workingKey = '6C3E5591F1463527D3F2A223C4BAE474';

    if (!encResp) {
      return new NextResponse('No encrypted response received.', { status: 400 });
    }

    // Decrypt the response
    const ccavResponse = decrypt(encResp, workingKey);

    // The response is in the format of key1=value1&key2=value2...
    const responseObj = querystring.parse(ccavResponse);

    console.log('CCAvenue Decrypted Response:', responseObj);

    // Construct an HTML response to show the user the transaction status.
    // Note: In a real app, you might want to save this to your database and redirect the user
    // to a dedicated Success/Failure page using NextResponse.redirect()

    const status = responseObj.order_status === 'Success' ? 'Payment Successful' : 'Payment Failed / Aborted';
    const statusColor = responseObj.order_status === 'Success' ? 'green' : 'red';

    const htmlResponse = `
      <!DOCTYPE html>
      <html>
      <head>
        <title>Payment Status</title>
        <style>
          body { font-family: sans-serif; display: flex; justify-content: center; align-items: center; height: 100vh; background: #f9fafb; margin: 0; }
          .container { background: white; padding: 40px; border-radius: 12px; box-shadow: 0 4px 12px rgba(0,0,0,0.1); max-width: 600px; width: 100%; text-align: center; }
          h1 { color: ${statusColor}; }
          .details { margin-top: 20px; text-align: left; }
          .details p { margin: 8px 0; border-bottom: 1px solid #eee; padding-bottom: 8px; }
          .btn { display: inline-block; margin-top: 24px; padding: 12px 24px; background: #1e3a8a; color: white; text-decoration: none; border-radius: 8px; font-weight: bold; }
        </style>
      </head>
      <body>
        <div class="container">
          <h1>${status}</h1>
          <p>Your transaction has been processed.</p>
          
          <div class="details">
            <p><strong>Order ID:</strong> ${responseObj.order_id}</p>
            <p><strong>Tracking ID:</strong> ${responseObj.tracking_id}</p>
            <p><strong>Amount:</strong> ${responseObj.currency} ${responseObj.amount}</p>
            <p><strong>Status Message:</strong> ${responseObj.status_message || responseObj.order_status}</p>
          </div>
          
          <a href="/ccavenue-test" class="btn">Go Back to Test Page</a>
        </div>
      </body>
      </html>
    `;

    return new NextResponse(htmlResponse, {
      headers: {
        'Content-Type': 'text/html',
      },
    });

  } catch (error) {
    console.error('Error in CCAvenue Response API:', error);
    return new NextResponse('Internal Server Error', { status: 500 });
  }
}
