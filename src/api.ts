import express, {Request, Response} from 'express';
import HealthCheck from "./modules/health-check/HealthCheck";
import Shortener from "./modules/shortener/Shortener";
import RedisConnector from "./database/redis/RedisConnector";

const app = express();
app.use(express.json());
app.get('/health-check', async (req: Request, res: Response) => {
    const healthCheck = new HealthCheck();
    res.json(await healthCheck.respond());
});
app.post('/shorten', async (req: Request, res: Response) => {
    try {
        const shortener = new Shortener(new RedisConnector());
        res.json(await shortener.execute(req.body));
    } catch (e: any) {
        res.status(422).json({
            error: {
                message: e.message
            }
        })
    }
});
app.get('/:tinyUrl', async (req: Request, res: Response) => {
    try {
        const shortener = new Shortener(new RedisConnector());
        const response = await shortener.retrieveOriginalUrl({ url: req.params.tinyUrl });
        res.redirect(response.newUrl);
    } catch (e: any) {
        res.status(422).json({
            error: {
                message: e.message
            }
        })
    }
});
app.listen(8080);