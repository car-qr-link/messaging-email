import { send } from "../unisender";
import { LOGO_IMAGE, TEMPLATE } from "./template";

export class Gateway {
    private readonly baseUrl: string;
    private readonly apiKey: string;

    public constructor(
        url: string
    ) {
        const parsed = new URL(url);
        if (!parsed.password) {
            throw new Error('API token must be provided as password in URL');
        }

        this.baseUrl = `${parsed.origin}${parsed.pathname}`;
        this.apiKey = parsed.password;
    }

    public async sendMessage(address: string, message: string) {
        const body = TEMPLATE
            .replace(
                '[MESSAGE]',
                message.split('\n').join('<br/>')
            )
            .replace(
                '[YEAR]',
                new Date().getFullYear().toString()
            );

        const result = await send(
            this.baseUrl,
            this.apiKey,
            {
                message: {
                    recipients: [{
                        email: address,
                    }],
                    body: {
                        html: body,
                    },
                    inline_attachments: [{
                        type: "image/png",
                        name: "logo.png",
                        content: LOGO_IMAGE,
                    }],
                    subject: "Уведомление от Car QR Link",
                    from_email: 'no-reply@carqr.link',
                    from_name: 'Car QR Link',
                },
            }
        );

        // console.log(result);
    }
}