import userModel from "../models/userModel.js";
import bcrypt from "bcrypt";

export const getusers = async (req, res) => {
  const users = await userModel.find();   // ✅ correct
  res.json(users);
};

export const adduser = async (req, res) => {
  const body = req.body;
  const hashedPassword = await bcrypt.hash(body.password, 10);
  body.password = hashedPassword;
  await userModel.create(body);
  res.redirect("/users");
};

export const adduserForm = async (req, res) => {
  res.render("users/add");
};

export const deleteuser = async (req, res) => {
  const id = req.params.id;
  await userModel.findByIdAndDelete(id);
  res.redirect("/users");
};

export const edituserForm = async (req, res) => {
  const id = req.params.id;
  const user = await userModel.findOne({ _id: id });
  res.render("users/edit", { user });
};

export const saveuser = async (req, res) => {
  const id = req.params.id;
  await userModel.findByIdAndUpdate(id, req.body);
  res.redirect("/users");
};