import { AuthServices } from '../services/auth.js';
import { HttpError } from '../types/http.error.js';
import createDebug from 'debug';
import { Controller } from './controller.js';
const debug = createDebug('FP:UserController');
export class UserController extends Controller {
  constructor(repo) {
    super();
    this.repo = repo;
    debug('Instantiated');
  }

  async register(req, res, next) {
    try {

      const passwd = await AuthServices.hash(req.body.password);
      req.body.password = passwd;
      res.status(201);
      res.send(await this.repo.create(req.body));
    } catch (error) {
      next(error);
    }
  }

  async login(req, res, next) {
    try {
      if (!req.body.user || !req.body.password)
        throw new HttpError(400, 'Bad Request', 'Invalid user or password');

      console.log("yamil", this.repo.search({
        key: 'userName',
        value: req.body.user,
      }));
      let data = await this.repo.search({
        key: 'userName',
        value: req.body.user,
      });
      console.log("yamil");
      if (!data.length) {
        data = await this.repo.search({
          key: 'email',
          value: req.body.user,
        });
      }

      if (!data.length)
        throw new HttpError(400, 'Bad Request', 'Invalid user or password');
      const isUserValid = await AuthServices.compare(
        req.body.password,
        data[0].password
      );
      if (!isUserValid)
        throw new HttpError(400, 'Bad Request', 'Invalid user or password');
      const payload = {
        id: data[0].id,
        userName: data[0].userName,
      };
      const token = AuthServices.createJWT(payload);
      const response = {
        token,
        user: data[0],
      };
      console.log("yamil", response);
      res.send(response);
    } catch (error) {
      next(error);
    }
  }
}
