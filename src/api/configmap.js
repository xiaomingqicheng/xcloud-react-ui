import request from '@/utils/request'

export function postConfigmap(data) {
    return request({
        url: '/v1/configmap',
        method: 'post',
        data
    })
}

export function getConfigmap() {
    return request({
        url: '/v1/configmap',
        method: 'get'
    })
}

export function getNamespace(params) {
    return request({
        url: '/v1/namespace',
        method: 'get',
        params
    })
}