'use strict'
const Hoja= use('App/Models/HojaDeParte');
const Factura = use('App/Models/Factura');
/** @typedef {import('@adonisjs/framework/src/Request')} Request */
/** @typedef {import('@adonisjs/framework/src/Response')} Response */
/** @typedef {import('@adonisjs/framework/src/View')} View */

/**
 * Resourceful controller for interacting with facturas
 */
class FacturaController {
  /**
   * Show a list of all facturas.
   * GET facturas
   *
   * @param {object} ctx
   * @param {Request} ctx.request
   * @param {Response} ctx.response
   * @param {View} ctx.view
   */
  async index ({ request, response, view }) {
    const facturas = await Factura.query().with('hoja').fetch();
    return view.render('factura.index',{facturas:facturas.toJSON()});
  }

  /**
   * Render a form to be used for creating a new factura.
   * GET facturas/create
   *
   * @param {object} ctx
   * @param {Request} ctx.request
   * @param {Response} ctx.response
   * @param {View} ctx.view
   */
  async create ({ request, response, view }) {
    let hojas = await Hoja.all();
      return view.render('factura.create',{hojas:hojas.toJSON()});
  }

  /**
   * Create/save a new factura.
   * POST facturas
   *
   * @param {object} ctx
   * @param {Request} ctx.request
   * @param {Response} ctx.response
   */
  async store ({ request, response }) {
    await Factura.create(request.all());
    return response.redirect('/factura')
  }

  /**
   * Display a single factura.
   * GET facturas/:id
   *
   * @param {object} ctx
   * @param {Request} ctx.request
   * @param {Response} ctx.response
   * @param {View} ctx.view
   */
  async show ({ params, request, response, view }) {
  }

  /**
   * Render a form to update an existing factura.
   * GET facturas/:id/edit
   *
   * @param {object} ctx
   * @param {Request} ctx.request
   * @param {Response} ctx.response
   * @param {View} ctx.view
   */
  async edit ({ params, request, response, view }) {
    let factura =await Factura.find(params.id);
    let hojas = await Hoja.all();
    return view.render('factura.edit',{factura:factura.toJSON(),hojas:hojas.toJSON()});
  }

  /**
   * Update factura details.
   * PUT or PATCH facturas/:id
   *
   * @param {object} ctx
   * @param {Request} ctx.request
   * @param {Response} ctx.response
   */
  async update ({ params, request, response }) {
    let factura =await Factura.find(params.id);
    factura.merge(request.all());
    await factura.save();
    return response.redirect('/factura')
  }

  /**
   * Delete a factura with id.
   * DELETE facturas/:id
   *
   * @param {object} ctx
   * @param {Request} ctx.request
   * @param {Response} ctx.response
   */
  async destroy ({ params, request, response }) {
    let factura =await Factura.find(params.id);
    factura.delete();
    return response.redirect('/factura')
  }
}

module.exports = FacturaController
