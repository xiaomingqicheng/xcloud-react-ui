import request from '@/utils/request'


export function getClusterImages(params) {
    return request({
        url: '/v1/clusterimages',
        method: 'get',
        params
    })
}

export function getImageTagList(params) {
    return request({
        url: '/v1/imagetaglist',
        method: 'get',
        params
    })
}