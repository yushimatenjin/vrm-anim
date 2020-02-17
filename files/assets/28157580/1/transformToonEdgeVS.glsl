uniform float edgeSize;

mat4 getModelMatrix() {
    return matrix_model;
}

vec4 getPosition() {
    dModelMatrix = getModelMatrix();
    vec4 posW = dModelMatrix * vec4(vertex_position, 1.0);
    vec3 normal = normalize(matrix_normal * vertex_normal);
    posW.xyz += normal * edgeSize;
    dPositionW = posW.xyz;
    return matrix_viewProjection * posW;
}

vec3 getWorldPosition() {
    return dPositionW;
}

