import React from 'react';
import { Card, Goods } from '@chatui/core';

export default function Property(props) {
    return (
        <div>
            <h3>White bread added to shopping list</h3>
            <Card size="xl">
                <Goods
                    img="https://www.svgrepo.com/show/101598/bread.svg"
                    name="Bread"
                    desc="Delicious warm bread"
                    tags={[
                        { name: '#shoplyft' },
                        { name: '#bread' },
                        { name: '#shop4shop' },
                    ]}
                    currency="$"
                    price="849"
                    count={6}
                    unit="kg"
                    onClick={(e) => console.log(e)}
                    action={{
                        // icon: 'cart',
                        onClick(e) {
                            console.log(e);
                            e.stopPropagation();
                        },
                    }}
                />
            </Card></div>
    );
}