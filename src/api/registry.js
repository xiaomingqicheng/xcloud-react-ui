import request from '@/utils/request'

export function postRegistry(data) {
    return request({
        url: '/v1/registry',
        method: 'post',
        data
    })
}

export function getRegistry() {
    return request({
        url: '/v1/registry',
        method: 'get',
    })
}

export function deleteRegistry(id) {
    return request({
        url: '/v1/registry/' + id + '/',
        method: 'delete',
    })
}