import request from '@/utils/request'

export function postConfigmap(data) {
    return request({
        url: '/v1/configmap',
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