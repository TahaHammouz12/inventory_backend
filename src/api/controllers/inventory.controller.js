import Joi from 'joi';
import HttpStatus from 'http-status-codes';
import inventory from '../models/inventory.model';

export default {
  //find all
  findAll(req, res, next) {
    inventory.find()
      .then(inventory => res.json(inventory))
      .catch(err => res.status(HttpStatus.INTERNAL_SERVER_ERROR).json(err));
  },
  //create new item
  create(req, res, next) {
    const schema = Joi.object().keys({
      item_name: Joi.string().required(),
      date: Joi.date().required(),
      qty: Joi.number()
        .integer()
        .required(),
      item_code: Joi.number().optional(),
    });
    const { error, value } = Joi.validate(req.body, schema);
    if (error && error.details) {
      return res.status(HttpStatus.BAD_REQUEST).json(error);
    }
    inventory.create(value)
      .then(inventory => res.json(inventory))
      .catch(err => res.status(HttpStatus.INTERNAL_SERVER_ERROR).json(err));
  },
  //find by id
  findOne(req, res) {
    const { id } = req.params;
    inventory.findById(id)
      .then(inventory => {
        if (!inventory) {
          return res.status(HttpStatus.NOT_FOUND).json({ err: 'Could not find any item in inventory' });
        }
        return res.json(inventory);
      })
      .catch(err => res.status(HttpStatus.INTERNAL_SERVER_ERROR).json(err));
  },
  //delete the item
  delete(req, res) {
    const { id } = req.params;
    inventory.findByIdAndRemove(id)
      .then(inventory => {
        if (!inventory) {
          return res.status(HttpStatus.NOT_FOUND).json({ err: 'Could not delete any item in inventory' });
        }
        return res.json(inventory);
      })
      .catch(err => res.status(HttpStatus.INTERNAL_SERVER_ERROR).json(err));
  },
  //update the item
  update(req, res) {
    const { id } = req.params;
    const schema = Joi.object().keys({
      item_name: Joi.string().required(),
      date: Joi.date().required(),
      qty: Joi.number()
        .integer()
        .required(),
      item_code: Joi.number().optional(),
    });
    const { error, value } = Joi.validate(req.body, schema);
    if (error && error.details) {
      return res.status(HttpStatus.BAD_REQUEST).json(error);
    }
    inventory.findOneAndUpdate({ _id: id }, value, { new: true })
      .then(inventory => res.json(inventory))
      .catch(err => res.status(HttpStatus.INTERNAL_SERVER_ERROR).json(err));
  },
};
