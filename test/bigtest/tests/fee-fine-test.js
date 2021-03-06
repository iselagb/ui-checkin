import {
  expect,
} from 'chai';

import {
  beforeEach,
  describe,
  it,
} from '@bigtest/mocha';

import wait from '../helpers/helpers';

import setupApplication from '../helpers/setup-application';
import CheckInInteractor from '../interactors/check-in';

describe('CheckIn fee(s) fine(s)', () => {
  describe('fee fine absent', () => {
    setupApplication({
      scenarios: [
        'account',
        'inventory-items',
        'circulation-check-in-by-barcode-without-user',
        'circulation-requests'
      ]
    });

    const checkIn = new CheckInInteractor();

    beforeEach(async function () {
      this.visit('/checkin', () => {
        expect(checkIn.$root).to.exist;
      });

      await checkIn.barcode('9676761472500').clickEnter();
      await wait();
    });

    describe('fee fine details button', () => {
      beforeEach(async function () {
        await checkIn.selectEllipse();
        await wait();
        await checkIn.selectFeeFineDetails();
      });

      it('should not navigate to fee/fine details page', function () {
        const {
          search,
          pathname,
        } = this.location;

        expect(pathname + search)
          .to.include('/checkin');
      });
    });

    describe('fee fine status', () => {
      it('should not render fee fine owned status', () => {
        expect(checkIn.confirmFeeFineOwnedStatusPresent).to.be.false;
      });
    });
  });

  describe('fee fine', () => {
    setupApplication({
      scenarios: [
        'account',
        'inventory-items',
        'circulation-check-in-by-barcode',
        'circulation-requests'
      ]
    });

    const checkIn = new CheckInInteractor();

    beforeEach(async function () {
      this.visit('/checkin', () => {
        expect(checkIn.$root).to.exist;
      });

      await checkIn.barcode('9676761472500').clickEnter();
      await wait();
    });

    describe('fee fine details button', () => {
      beforeEach(async function () {
        await checkIn.selectEllipse();
        await wait();
        await checkIn.selectFeeFineDetails();
      });

      it('should navigate to fee/fine details page', function () {
        const {
          search,
          pathname,
        } = this.location;

        expect(pathname + search)
          .to.include('/users/')
          .to.include('/accounts/view/');
      });
    });

    describe('fee fine status', () => {
      it('should render fee fine owned status', () => {
        expect(checkIn.confirmFeeFineOwnedStatusPresent).to.be.true;
      });
    });
  });

  describe('fees fines', () => {
    setupApplication({
      scenarios: [
        'accounts',
        'inventory-items',
        'circulation-check-in-by-barcode',
        'circulation-requests'
      ]
    });

    const checkIn = new CheckInInteractor();

    beforeEach(async function () {
      this.visit('/checkin', () => {
        expect(checkIn.$root).to.exist;
      });

      await checkIn.barcode('9676761472500').clickEnter();
      await wait();
    });

    describe('fees fines details button', () => {
      beforeEach(async function () {
        await checkIn.selectEllipse();
        await wait();
        await checkIn.selectFeeFineDetails();
      });

      it('should navigate to fees/fines details page', function () {
        const {
          search,
          pathname,
        } = this.location;

        expect(pathname + search)
          .to.include('/users/')
          .to.include('/accounts/open');
      });
    });

    describe('fee fine status', () => {
      it('should render fee fine owned status', () => {
        expect(checkIn.confirmFeeFineOwnedStatusPresent).to.be.true;
      });
    });
  });
});
