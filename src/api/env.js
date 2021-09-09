import request from '@/utils/request'

export function postEnv(data) {
    return request({
        url: '/v1/env',
        method: 'post',
        data
    })
}

export function getEnv() {
    return request({
        url: '/v1/env',
        method: 'get',
    })
}