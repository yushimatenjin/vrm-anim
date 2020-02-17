uniform float edgeSize;

mat4 getModelMatrix() {
    return getBoneMatrix(vertex_boneIndices.x) * vertex_boneWeights.x +
           getBoneMatrix(vertex_boneIndices.y) * vertex_boneWeights.y +
           getBoneMatrix(vertex_boneIndices.z) * vertex_boneWeights.z +
           getBoneMatrix(vertex_boneIndices.w) * vertex_boneWeights.w;
}

vec4 getPosition() {
    dModelMatrix = getModelMatrix();
    vec4 posW = dModelMatrix * vec4(vertex_position, 1.0);
    posW.xyz += skinPosOffset;
    dNormalMatrix = mat3(dModelMatrix[0].xyz, dModelMatrix[1].xyz, dModelMatrix[2].xyz);
    vec3 normal = normalize(dNormalMatrix * vertex_normal);
    posW.xyz += normal * edgeSize;
    dPositionW = posW.xyz;
    return matrix_viewProjection * posW;
}

vec3 getWorldPosition() {
    return dPositionW;
}

