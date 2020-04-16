import { Test, TestingModule } from "@nestjs/testing";
import { InterestListsController } from "./interest-list.controller";

describe("InterestLists Controller", () => {
    let controller: InterestListsController;

    beforeEach(async () => {
        const module: TestingModule = await Test.createTestingModule({
            controllers: [InterestListsController],
        }).compile();

        controller = module.get<InterestListsController>(InterestListsController);
    });

    it("should be defined", () => {
        expect(controller).toBeDefined();
    });
});
