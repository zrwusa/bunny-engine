export const getRangeFromPrecisionScale = (precision: number, scale: number) => {
    if (scale > precision) return {minimum:0, maximum:0};

    return {minimum: parseFloat('0.' + '1'.padStart(scale, '0')),
        maximum: parseInt('9'.repeat(precision - scale))}
}