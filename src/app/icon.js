import { ImageResponse } from 'next/og';

export const size = { width: 64, height: 64 };
export const contentType = 'image/png';

export default async function Icon() {
    return new ImageResponse(
        (
            <div
                style={{
                    width: '64px',
                    height: '64px',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    background: 'white',
                    borderRadius: '12px',
                    overflow: 'hidden',
                }}
            >
                <img
                    src="/images/logo/ahct-logo.jpg"
                    style={{ width: '64px', height: '64px', objectFit: 'contain' }}
                />
            </div>
        ),
        size
    );
}