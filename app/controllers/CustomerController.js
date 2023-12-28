import {prismaClient} from "../../prisma/PrismaClient.js"

class CustomerController {
    getCustomer (req, res) {
        prismaClient.customer.findMany()
            .then(result => {
                res.status(200)
                    .json({
                        status: 'success',
                        data: result,
                        error: null
                    });
            })
            .catch(err => {
                res.status(400)
                    .json({
                        status: 'failed',
                        data: null,
                        error: err.message
                    });
            });
    }

    storeCustomer (req, res) {
        prismaClient.customer.create({
            data: {
                name: req.body.name,
                email: req.body.email,
                phone: req.body.phone
            }
        })
        .then(result => {
            res.status(200)
                .json({
                    status: 'success',
                    data: result,
                    error: null
                })
        })
        .catch(err => {
            res.status(400)
                .json({
                    status: 'failed',
                    data: null,
                    error: err.message
                })
        })
    }

    updateCustomer (req, res) {
        prismaClient.customer.update({
            data: {
                name: req.body.name,
                email: req.body.email,
                phone: req.body.phone
            },
            where: {
                id: parseInt(req.params.id)
            }
        })
        .then(result => {
            res.status(200)
                .json({
                    status: 'success',
                    data: result,
                    error: null
                })
        })
        .catch(err => {
            res.status(400)
                .json({
                    status: 'failed',
                    data: null,
                    error: err.message
                })
        })
    }

    deleteCustomer (req, res) {
        prismaClient.customer.delete({
            where: {
                id: parseInt(req.params.id)
            }
        })
        .then(result => {
            res.status(200)
                .json({
                    status: 'success',
                    data: result,
                    error: null
                })
        })
        .catch(err => {
            res.status(400)
                .json({
                    status: 'failed',
                    data: null,
                    error: err.message
                })
        })
    }

    createBulkCustomer (req, res) {
        let dataBulkCustomer = JSON.parse(req.body.data_customers)
        console.log(dataBulkCustomer)
    }
}

export default new CustomerController()