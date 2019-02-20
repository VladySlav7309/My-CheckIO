romanNumerals = int => {
    const numerals = {
		'I' : 1,
		'V' : 5,
		'X' : 10,
		'L' : 50,
		'C' : 100,
		'D' : 500,
		'M' : 1000
    }
    const dims = [];
    const string_dims = [];
	const getDims = number => {
		const s_number = number.toString().split('');

		s_number.forEach((dim, index) => {
			const multiplier = Math.pow(10, (s_number.length - index - 1)) || 1;
			dims.push( parseInt(dim) * multiplier );
        });
    };
	const isExact = int => {
		for(let letter in numerals) {
            if( numerals[letter] == int ) {
				return letter;
            }
        }
		return false;
    }
	const getCompDim  = int => {
		let   bounds  = [];
		let from_top  = true;
		let       dx  = 'I';
		let   dim     = '';
		let  finished = false;
		let  compound = 0;

		const letters = Object.keys(numerals);

        letters.map((letter, i) => {
			const next = letters[i + 1];
			let curr_bounds = [{
				letter : letter,
				value  : numerals[letter]
			}, {
				letter : next,
				value  : numerals[next]
			}];

			if( int > curr_bounds[0].value && int < curr_bounds[1].value ) {
				bounds = curr_bounds;
				if( curr_bounds[1].value / 2 == curr_bounds[0].value ) {
					dx = letters[i - 1];
                }
				else {
					dx = curr_bounds[0].letter;
                }
            }
        });

        let total_diff = bounds[1].value - bounds[0].value;
		let diff_low   = 100 * (int - bounds[0].value) / total_diff;

		from_top = diff_low > 60 ? true : false;
        compound = from_top ? bounds[1].value : bounds[0].value;
        dim      = from_top ? bounds[1].letter : bounds[0].letter;

        while(! finished) {
			dim      = from_top ? dx + dim                : dim + dx;
			compound = from_top ? compound - numerals[dx] : compound + numerals[dx];
			
			if( int == compound ) {
				finished = true;
            }
        }
		return dim;
    };
	const getRomanNumbers = () => {
        dims.forEach((dim, index) => {
			if( dim !== 0 ) {		
				if(dim > 1000) {
                    const s_dim = ''.padStart(dim / 1000, 'M');

                    string_dims.push(s_dim);
                }
                else {
                    const exact_dim = isExact(dim);

                    if( exact_dim ) {				
                        string_dims.push( exact_dim );
                    }
                    else {
                        const s_dim = getCompDim(dim);
                        string_dims.push(s_dim);
                    }				
                };
            }
        });
    };
	
	getDims(int);
	getRomanNumbers();

	return string_dims.join('');
}
