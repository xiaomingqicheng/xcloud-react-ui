import request from '@/utils/request'

export function getbuildresult(params) {
    return request({
        url: '/v1/getbuildresult',
        method: 'get',
        params
    })
}

