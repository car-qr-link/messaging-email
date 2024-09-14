import { createLogger, createQueueClient } from "@car-qr-link/messaging-base";
import { config } from "./config/index";
import { Gateway } from "./gateway/index";
import { SenderService } from "./services/sender";

async function main() {
    const logger = createLogger();
    const queue = createQueueClient(config.BROKER_URL);
    const gateway = new Gateway(config.GATEWAY_URL);

    const sendService = new SenderService(
        config.SEND_QUEUE,
        queue,
        gateway,
        logger
    );

    await queue.start();
    await sendService.start();

    process.on('SIGINT', async () => {
        logger.info('Shutting down...');
        await sendService.stop();
        await queue.close();

        logger.info('Bye!');
        process.exit(0);
    });

    logger.info('Ready!');
}

main();
