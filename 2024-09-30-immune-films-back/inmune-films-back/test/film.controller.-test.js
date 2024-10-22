
import { FilmController } from "../src/controllers/film.controller"
import { UserController } from "../src/controllers/user.controller"
import { FilmRepo } from "../src/repository/film.m.repository"
/*  
describe("Controller", () => {

   it("call function post", async () => {

        const newFilm = [
            { title: "film 1", content: "content 1" }
        ];

        FilmRepo.prototype.create = jest.fn()
            .mockResolvedValue(newFilm);

        const user = {
            films: []
        }
        UserController.prototype.queryById = jest.fn().mockResolvedValue(user);


        // arrange: Mock the request, response, and next function
        const req = {
            body: jest.fn(),
        };
        const res = {
            json: jest.fn(),
        };
        const next = jest.fn();
        const controller = new FilmController();
        // act: Call the controller.getAll method
        await controller.post(req, res, next);
        // assert: Verify that the FilmRepo.query method was called

        //expect(res).toBeCalled();
        expect(res.json).toHaveBeenCalledWith(newFilm);

    }); 




})*/