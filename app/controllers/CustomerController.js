import {prismaClient} from "../../prisma/PrismaClient.js"

class CustomerController {
    getCustomer (req, res) {
        let page = (req.query.page) ? parseInt(req.query.page) - 1 : 0

        prismaClient.customer.findMany({
            include: {
                address_customer: true,
                phone_number: true
            },
            orderBy: [
                {
                    id: 'desc'
                }
            ]
        })
            .then(result => {
                res.status(200)
                    .json({
                        status: 'success',
                        data: result,
                        error: null
                    });
            })
            .catch(err => {
                console.log(err.message)
                res.status(400)
                    .json({
                        status: 'failed',
                        data: null,
                        error: err.message
                    });
            });
    }

    async storeCustomer (req, res) {
        try {
            let customer = await prismaClient.customer.create({
                data: {
                    name: req.body.name,
                    email: req.body.email,
                    phone: req.body.phone,
                    address_customer: {
                        create: {
                            customer_address: req.body.address
                        }
                    }
                },
                include: {
                    address_customer: true
                }
            })

            res.status(200)
                .json({
                    status: 'success',
                    data: customer,
                    error: null
                })
        } catch (error) {
            console.log(error.message)
            res.status(400)   
                .json({
                    status: 'failed',
                    data: null,
                    error: error.message
                })
        }
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
        let bulkDataPhoneNumber = JSON.parse(req.body.data_customers)

        let readyToInput = []

        for (const dataPhoneNumber of bulkDataPhoneNumber) {
            readyToInput.push({
                customer_id: parseInt(dataPhoneNumber['customer_id']),
                phone_number: parseInt(dataPhoneNumber['phone_number']),
            })
        }

        prismaClient.phoneNumber.createMany({data: readyToInput})
        .then(result => {
            console.log(result)
            res.status(200)
                .json({
                    status: 'success',
                    data: result,
                    error: null
                })
        })
        .catch(err => {
            console.log(err.message)
            res.status(400)
                .json({
                    status: 'failed',
                    data: null,
                    error: err.message
                })
        })
    }
}

export default new CustomerController()