import React from 'react';
import { render } from '@testing-library/react';
import PTestForm from '../PTestForm';

describe('Personality Test Form', () => {

    test('Render Div', ()=>{
        const { getByTestId } = render(<PTestForm userID='2381410@students.wits.ac.za' />);
        const d = getByTestId('p-test-div');
        expect(d).toBeTruthy();
    });

    test('Data username - Test', () => {
        const { getByTestId } = render(<PTestForm userID='2381410@students.wits.ac.za' />);
        const data = getByTestId('ptest-data');
        expect(data.innerHTML).toEqual('Data belonging to 2381410@students.wits.ac.za')
    })

    test('Data username - Test2', () => {
        const { getByTestId } = render(<PTestForm userID='a0074560@wits.ac.za' />);
        const data = getByTestId('ptest-data');
        expect(data.innerHTML).toEqual('Data belonging to a0074560@wits.ac.za')
    })

    test('Print Education - Test', () => {
        const { getByTestId } = render(<PTestForm userID='a0074560@wits.ac.za' />);
        const data = getByTestId('ptest-txt3');
        expect(data.innerHTML).toEqual('Education')
    })

    test('Print Interests and Skills - Test', () => {
        const { getByTestId } = render(<PTestForm userID='a0074560@wits.ac.za' />);
        const data = getByTestId('ptest-txt1');
        expect(data.innerHTML).toEqual('Interests and Skills')
    })

    test('Print Favourite Books Read - Test', () => {
        const { getByTestId } = render(<PTestForm userID='a0074560@wits.ac.za' />);
        const data = getByTestId('ptest-txt2');
        expect(data.innerHTML).toEqual('Favourite Books Read')
    })

    test('Print Work - Test', () => {
        const { getByTestId } = render(<PTestForm userID='a0074560@wits.ac.za' />);
        const data = getByTestId('ptest-txt4');
        expect(data.innerHTML).toEqual('Work')
    })


})
