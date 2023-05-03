import mongoose from "mongoose";
import { Offer } from "../model/offerModel.js";

export const createOffer = async (req, res) => {
  try {
    const offer = await Offer.create(req.body);
    res.status(201).send(offer);
  } catch (error) {
    res.status(400).send({ message: "Error creating offer", error });
  }
};

export const getAllOffers = async (req, res) => {
  try {
    const offers = await Offer.find();
    res.send(offers);
  } catch (error) {
    res.status(500).send({ message: "Error fetching offers", error });
  }
};
