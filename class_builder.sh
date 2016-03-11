#!/bin/bash

if [ x$2 != x ] && [ x$2 != x"-d" ]
then
    echo "argument $2 is not allow"
    exit 1
fi

if [ x$1 != x ]
then
    cat > ${3}/${1}.js << END_TEXT
'use strict';

import React from 'react-native';
import {
    BaseComponent
} from 'easier-react-native'

class $1 extends BaseComponent {

    constructor(props) {
        super(props);
    }

    renderBody() {

    }

}

module.exports = $1;
END_TEXT
else
    echo "class name needed!"
fi
