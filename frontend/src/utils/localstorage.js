import axios from 'axios'

export class Data {
    constructor(type, formPath, submitPath, formSchemaPath) {
        this.type = type
        this.formPath = formPath
        this.submitPath = submitPath
        this.formSchemaPath = formSchemaPath
    }

    appendType = (data) => {
        return { type: this.type, ...data }
    }

    addInitialValues = (oldFormSchema, routerQuery) => {
        if (routerQuery.hasOwnProperty("id")) {
            var initialValues = this.getData(routerQuery.id)
            if (initialValues) {
                var newFormSchema = oldFormSchema.map(field => initialValues.hasOwnProperty(field.id) ? {...field, value: initialValues[field.id]} : field)
                return newFormSchema
            }
        }
        return oldFormSchema
    }

    submitData = async (data) => {
        return await axios.post(this.submitPath, JSON.stringify(this.appendType(data))).then((res) => {
            this.addData(this.appendType(data))
            return [true, res.data]
        }).catch((err) => {
            this.addData(this.appendType(data))
            return [false, err]
        }).finally(() => {
            return [false, null]
        })
    }

    getFormSchema = async () => {
        var form_schema_str = localStorage.getItem(this.type + "_form_schema")
        return await axios.get(this.formSchemaPath).then((res) => {
            localStorage.setItem(this.type + "_form_schema", JSON.stringify(res.data))
            return [true, res.data]
        }).catch((err) => {
            if (form_schema_str) {
                return [true, JSON.parse(form_schema_str)]
            }
            return [false, err]
        })
    }

    isType = (data) => {
        return data.type == this.type
    }

    getData = (id) => {
        var datas = localStorage.getItem(this.type + "_data")
        if (datas == null) {
            return null
        }
        datas = JSON.parse(datas)
        if (typeof id === 'string' && id.length > 0) {
            var data = datas.find(obj => {
                return obj.id == id
            })

            if (typeof data === 'undefined') {
                return null
            }

            return data
        } else {
            return datas
        }
    }

    addData = (newData) => {
        var oldDatas = this.getData() || []
        if (newData.hasOwnProperty("id")) {
            var oldData = oldDatas.find(obj => {
                return obj.id == newData.id
            })
            if (typeof oldData === 'undefined') {
                var newDatas = [...oldDatas, newData]
                localStorage.setItem(this.type + "_data", JSON.stringify(newDatas))
                return true
            }
        }
        return false
    }

    popData = (id) => {
        var oldDatas = this.getData() || []
        var data = oldDatas.find(obj => {
            return obj.id == id
        })
        var newDatas = oldDatas.filter(obj => {
            return obj.id !== id
        })
        localStorage.setItem(this.type + "_data", newDatas)
        return data
    }
}

export var datas = {
    match: new Data("match", "/scout/match", "/api/scout/match", "/api/scout/match/getFormSchema"),
    pit: new Data("pit", "/scout/pit", "/api/scout/pit", "/api/scout/pit/getFormSchema"),
}