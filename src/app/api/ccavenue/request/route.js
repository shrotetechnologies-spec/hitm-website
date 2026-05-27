import { NextResponse } from 'next/server';
import { encrypt } from '@/lib/ccavenue';

export async function POST(req) {
  try {
    const body = await req.json();
    
    const merchantId = '4447602';
    const accessCode = 'ATIT92NE85CC48TICC';
    const workingKey = '6C3E5591F1463527D3F2A223C4BAE474';

    // Base URL depending on environment. For local testing, use localhost.
    // In production, this should be https://www.hitmranchi.in
    const baseUrl = req.headers.get('origin') || 'http://localhost:3000';
    const redirectUrl = `${baseUrl}/api/ccavenue/response`;
    const cancelUrl = `${baseUrl}/api/ccavenue/response`;

    // Construct the payload according to CCAvenue's requirements
    const payloadData = {
      merchant_id: merchantId,
      order_id: body.order_id || Date.now().toString(),
      currency: 'INR',
      amount: body.amount || '1.00',
      redirect_url: redirectUrl,
      cancel_url: cancelUrl,
      language: 'EN',
      billing_name: body.billing_name || 'Test User',
      billing_address: body.billing_address || 'Test Address',
      billing_city: body.billing_city || 'Ranchi',
      billing_state: body.billing_state || 'JH',
      billing_zip: body.billing_zip || '834001',
      billing_country: 'India',
      billing_tel: body.billing_tel || '9999999999',
      billing_email: body.billing_email || 'test@example.com',
    };

    // Convert payload object to query string format: key1=value1&key2=value2...
    const queryString = Object.keys(payloadData)
      .map(key => `${key}=${encodeURIComponent(payloadData[key])}`)
      .join('&');

    // Encrypt the payload string
    const encRequest = encrypt(queryString, workingKey);

    // Generate the HTML form for CCAvenue auto-submit
    const formHtml = `
      <form id="nonseamless" method="post" name="redirect" action="https://test.ccavenue.com/transaction/transaction.do?command=initiateTransaction">
        <input type="hidden" id="encRequest" name="encRequest" value="${encRequest}">
        <input type="hidden" name="access_code" id="access_code" value="${accessCode}">
        <script language="javascript">document.redirect.submit();</script>
      </form>
    `;

    return NextResponse.json({ formHtml });
  } catch (error) {
    console.error('Error in CCAvenue Request API:', error);
    return NextResponse.json({ error: 'Internal Server Error' }, { status: 500 });
  }
}
