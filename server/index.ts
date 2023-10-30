import { Request, Response } from "express";
import { InvalidField, Validation } from "../src/utils/validation/validation";
import { definePattern } from "../src/utils/helpers/definePattern";

const express = require("express");
const cors = require("cors");
const multer  = require('multer')

const upload = multer()
const app = express();

const port = 9090;

app.use(express.json())
app.use(cors());

app.post("/api/submit", upload.none(), (req: Request, res: Response) => {
  const fieldData = []

  for (let key in req.body) {
    const { fn, errorMsg } = definePattern(key)
    fieldData.push({
      key,
      value: req.body[key],
      pattern: fn,
      errorMsg: errorMsg
    })
  }

  const  validation = new Validation();
  validation.addField(fieldData)
  
  setTimeout(() => {
    res.statusCode = 200;

    if (validation.invalidFieldsList.length) {
      const createErrorResponse = (list: InvalidField[]) => {
        return list.reduce((acc: Record<string,string>, item: InvalidField) => {
          acc[item.key] = item.errorMsg
          return acc;
        }, {})
      }

      res.send({
        status: "error",
        fields: createErrorResponse(validation.invalidFieldsList)
      })
    } else {
      res.send({
        status: "success",
        message: "Form is sent",
      });
    }
  }, Math.random() * 1000);
});

app.post("/api/registration", (req: Request, res: Response) => {
  if (Math.random() > 0.5) {
    res.statusCode = 400;

    setTimeout(() => {
      res.send({
        status: "error",
        message: "Bad request",
      });
    }, Math.random() * 1000);

    return;
  }

  setTimeout(() => {
    res.statusCode = 200;
    res.send({
      status: "success",
      message: "You are registered",
    });
  }, Math.random() * 1000);
});

app.get("/api/ping", (req: Request, res: Response) => {
    res.statusCode = 200;
    res.send({
        status: "success",
        message: "Server is ready",
    });
});

app.listen(port, () => {
  console.log(`Example app listening on port ${port}`);
});