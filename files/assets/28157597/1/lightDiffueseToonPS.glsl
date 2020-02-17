uniform sampler2D texture_ramp;

float getLightDiffuse() {
    float light = max(dot(dNormalW, -dLightDirNormW), 0.0);
    return texture2D(texture_ramp, vec2(light, 0.0)).g;
}

