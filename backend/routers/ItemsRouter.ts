import * as express from "express";
import * as multer from "multer";

import { IItemData } from "../interfaces";
import ItemsService from "../services/ItemsService";

const storage = multer.memoryStorage();
const upload = multer({ dest: "../../frontend/public/img/", storage: storage });

export default class ItemsRouter {
  private itemsService: ItemsService;

  constructor(itemsService: ItemsService) {
    this.itemsService = itemsService;
  }

  router() {
    let router = express.Router();
    
    router.post("/", upload.single("itemPhoto"), this.add.bind(this));

    router.get("/:id", this.get.bind(this));
    router.get("/", this.getAll.bind(this));

    router.put("/:id", upload.single("itemPhoto"), this.update.bind(this));
    
    return router;
  }

  add(req: express.Request, res: express.Response) {
    return this.itemsService
      .add(req.body, req.file)
      .then((result: IItemData) => {
        res.status(201).json(result);
        console.log(result);
      })
      .catch((err: express.Errback) => {
        console.log("Post Error", err);
        res.status(500).json({ status: "failed" });
      });
  }

  get(req: express.Request, res: express.Response) {
    return this.itemsService
      .get(req.params.id)
      .then((result: IItemData) => {
        res.status(200).json(result);
      })
      .catch((err: express.Errback) => {
        console.log("Post Error", err);
        res.status(500).json({ status: "failed" });
      });
  }

  getAll(req: express.Request, res: express.Response) {
    if (req.query.category !== undefined) {
      return this.itemsService
        .getAllInCat(req.query.category)
        .then((result: any) => {
          res.status(200).json(result);
        })
        .catch((err: express.Errback) => {
          console.log("Post Error", err);
          res.status(500).json({ status: "failed" });
        });
    } else {
      return this.itemsService
        .getAll()
        .then((result: IItemData) => {
          res.status(200).json(result);
        })
        .catch((err: express.Errback) => {
          console.log("Post Error", err);
          res.status(500).json({ status: "failed" });
        });
    }
  }

  update(req: express.Request, res: express.Response) {
    return this.itemsService
      .update(req.params.id, req.body, req.file)
      .then((result: IItemData) => {
        res.status(201).json(result);
      })
      .catch((err: express.Errback) => {
        console.log("Post Error", err);
        res.status(500).json({ status: "failed" });
      });
  }
}
