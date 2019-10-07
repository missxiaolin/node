import apiModelServer = require('../model/server/api')
import file_upload = require('../utils/file_upload')

export = {
    upload: async (req: Express.Request) => {
        const file = await file_upload(req)
        const currentName = file.path.split('upload_')[1]
        const key = currentName.split('.')[0]
        return apiModelServer.upload(key, currentName)
    },
    getList: async (req: Express.Request) => {
        return apiModelServer.getList()
    },
}
