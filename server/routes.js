import express from "express";
import { createOffer, getAllOffers } from "./controller/offerController.js";

export const router = express.Router();

router.post("/offers", createOffer).get("/offers", getAllOffers);
