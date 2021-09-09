import request from '@/utils/request'

export function postCluster(data) {
    return request({
        url: '/v1/cluster',
        method: 'post',
        data
    })
}

export function getCluster() {
    return request({
        url: '/v1/cluster',
        method: 'get',
    })
}

export function getClusterDetail(clustername) {
    return request({
        url: '/v1/clusterdetail/' + clustername + '/',
        method: 'get',

    })
}

export function getClusterResDetail(params) {
    return request({
        url: '/v1/clusterresdetail/',
        method: 'get',
        params
    })
}
export function putCluster(id,data) {
    return request({
        url: '/v1/cluster/' + id + '/',
        method: 'put',
        data
    })
}