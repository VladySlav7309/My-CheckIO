recallPassword = (cipher, matrix) => {
    const phaze_90 = matrix => {
        let res = [];
        const row_len = matrix[0].length;

        for (let i = 0; i < row_len; i++) {
            matrix.forEach(row => {
                if (!res[i]) res[i] = [];
                res[i].unshift(row[i]);
            });
        }

        return res;
    }
    const getFromRow = (cipher, row) => {
        let res = '';

        (Array.isArray(cipher) ? cipher : cipher.split("")).forEach((unit, index) => {
            if (unit !== '.') {
                res += row[index];
            }
        });

        return res;
    };

    let res = '';
    let phazed = cipher;

    for (let i = 0; i < 4; i++) {
        phazed.forEach((row_cipher, index) => {
            res += getFromRow(row_cipher, matrix[index]);
        });

        phazed = phaze_90(phazed);
    };

    return res;
}