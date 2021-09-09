import request from '@/utils/request'

export function postCert(data) {
    return request({
        url: '/v1/cert',
        method: 'post',
        data
    })
}

export function getCert() {
    return request({
        url: '/v1/cert',
        method: 'get',
    })
}