import BigNumber from 'bignumber.js';
import { Address, Micheline, mich_to_ticket, Mstring, Nat, Rational, Ticket, Duration } from '../src/main'

describe('ArchetypeType', () => {

  describe('Address', () => {
    test('Fails with empty string', () => {
      const input = ""
      expect(() => { new Address(input) }).toThrow(`No matching prefix found. Received input: ${input}`)
    })

    test('Fails with dummy string', () => {
      const input = "dummy"
      expect(() => { new Address(input) }).toThrow(`No matching prefix found. Received input: ${input}`)
    })

    test('Fails without contract type prefix', () => {
      const input = "VSUr8wwzhLAzempoch5d6hLRiTh8Cjcjbsaf"
      expect(() => { new Address(input) }).toThrow(`No matching prefix found. Received input: ${input}`)
    })

    test('Fails with bad encoding', () => {
      const input = "tz1VSUr8wwNhLAzempoch5d6hLRiTh8CjcIl"
      expect(() => { new Address(input) }).toThrow(`Input is not b58 encoding compatible. Received input: ${input}`)
    })

    test('Succeeds with Valid tz1 User Address', () => {
      const input = "tz1VSUr8wwNhLAzempoch5d6hLRiTh8Cjcjb"
      expect(new Address(input).toString()).toBe(input)
    })

    test('Succeeds with Valid tz2 User Address', () => {
      const input = "tz28US7zJ7rLdWke75XEM3T5cLWCCxjnP4zf"
      expect(new Address(input).toString()).toBe(input)
    })

    test('Succeeds with Valid tz3 User Address', () => {
      const input = "tz3hFR7NZtjT2QtzgMQnWb4xMuD6yt2YzXUt"
      expect(new Address(input).toString()).toBe(input)
    })

    test('Succeeds with Valid tz4 User Address', () => {
      const input = "tz4HVR6aty9KwsQFHh81C1G7gBdhxT8kuytm"
      expect(new Address(input).toString()).toBe(input)
    })

    test('Succeeds with Valid txr1 User Address', () => {
      const input = "txr1YNMEtkj5Vkqsbdmt7xaxBTMRZjzS96UAi"
      expect(new Address(input).toString()).toBe(input)
    })

    test('Succeeds with Valid KT1 Contract Address', () => {
      const input = "KT1AaaBSo5AE6Eo8fpEN5xhCD4w3kHStafxk"
      expect(new Address(input).toString()).toBe(input)
    })
  });

  describe('Nat', () => {
    describe('Constructor', () => {
      test('Fails if neg number', () => {
        expect(() => { new Nat(-5) }).toThrow("Not an Nat value: -5")
      });
    });

    describe('toString', () => {

      test('Number simple', () => {
        expect(new Nat(5).toString()).toBe("5");
      });

      test('String simple', () => {
        expect(new Nat("5").toString()).toBe("5");
      });

      test('Bignumber simple', () => {
        expect(new Nat(new BigNumber("5")).toString()).toBe("5");
      });

      test('String big', () => {
        expect(new Nat("9999999999999999999999999999999999999").toString()).toBe("9999999999999999999999999999999999999");
      });

      test('Bignumber big', () => {
        expect(new Nat(new BigNumber("9999999999999999999999999999999999999")).toString()).toBe("9999999999999999999999999999999999999");
      });
    })
  })

  describe('Rational', () => {
    describe('toString', () => {
      it('String simple', () => {
        expect(new Rational("5").toString()).toBe("5");
      });

      it('Number simple', () => {
        expect(new Rational(5).toString()).toBe("5");
      });

      it('Number decimal', () => {
        expect(new Rational(5.4464).toString()).toBe("5.4464");
      });

      it('String decimal', () => {
        expect(new Rational("5.4464").toString()).toBe("5.4464");
      });

      it('String decimal percent', () => {
        expect(new Rational("5.4464%").toString()).toBe("0.054464");
      });

      it('String with big number', () => {
        expect(new Rational("99999999999999999999999956456456456999999999", new BigNumber("999999999999956456456456999999999")).toString()).toBe("100000000000.00435435435425664606");
      });

    });

    describe('to_number', () => {
      it('String simple', () => {
        expect(new Rational("5").to_number()).toBe(5);
      });

      it('Number simple', () => {
        expect(new Rational(5).to_number()).toBe(5);
      });

      it('Number decimal', () => {
        expect(new Rational(5.4464).to_number()).toBe(5.4464);
      });

      it('String decimal', () => {
        expect(new Rational("5.4464").to_number()).toBe(5.4464);
      });

      it('String decimal percent', () => {
        expect(new Rational("5.4464%").to_number()).toBe(0.054464);
      });

      it('String with big number', () => {
        expect(new Rational("99999999999999999999999956456456456999999999", new BigNumber("999999999999956456456456999999999")).to_number()).toBe(100000000000.00435);
      });
    })

    describe('Ticket', () => {
      it('Ticket', () => {
        const tjson: Micheline = {
          "prim": "Pair",
          "args": [
            {
              "string": "KT1PkBvorKLwdrP3UWUMo3ytZrRUq3wqfFGe"
            },
            {
              "string": "info"
            },
            {
              "int": "1"
            }
          ]
        };

        const ticket_actual = mich_to_ticket<string>(tjson, (x: Micheline): string => { return (x as Mstring).string });
        expect(new Ticket(new Address("KT1PkBvorKLwdrP3UWUMo3ytZrRUq3wqfFGe"), ("info" as string), new Nat(1)).equals(ticket_actual)).toBe(true)
        expect(new Ticket(new Address("KT1XcpRnLQANuGCJ9SZW3GXVG8BArUKymqtk"), ("info" as string), new Nat(1)).equals(ticket_actual)).toBe(false)
        expect(new Ticket(new Address("KT1PkBvorKLwdrP3UWUMo3ytZrRUq3wqfFGe"), ("infu" as string), new Nat(1)).equals(ticket_actual)).toBe(false)
        expect(new Ticket(new Address("KT1PkBvorKLwdrP3UWUMo3ytZrRUq3wqfFGe"), ("info" as string), new Nat(2)).equals(ticket_actual)).toBe(false)
      })
    })

    describe('to_mich', () => {
      it('String simple', () => {
        expect(JSON.stringify(new Rational("5").to_mich())).toBe('{"prim":"Pair","args":[{"int":"5"},{"int":"1"}]}');
      });

      it('Number simple', () => {
        expect(JSON.stringify(new Rational(5).to_mich())).toBe('{"prim":"Pair","args":[{"int":"5"},{"int":"1"}]}');
      });

      it('Number decimal', () => {
        expect(JSON.stringify(new Rational(5.4464).to_mich())).toBe('{"prim":"Pair","args":[{"int":"3404"},{"int":"625"}]}');
      });

      it('String decimal', () => {
        expect(JSON.stringify(new Rational("5.4464").to_mich())).toBe('{"prim":"Pair","args":[{"int":"3404"},{"int":"625"}]}')
      });

      it('String decimal percent', () => {
        expect(JSON.stringify(new Rational("5.4464%").to_mich())).toBe('{"prim":"Pair","args":[{"int":"851"},{"int":"15625"}]}')
      });

      it('String with big number', () => {
        expect(JSON.stringify(new Rational("99999999999999999999999956456456456999999999", new BigNumber("999999999999956456456456999999999")).to_mich())).toBe('{"prim":"Pair","args":[{"int":"5000000000000217717717712832303"},{"int":"50000000000000000000"}]}')
      });

      it('Ticket', () => {
        const f = (x: string): Mstring => { return { "string": x } };
        expect(JSON.stringify(new Ticket(new Address("KT1PkBvorKLwdrP3UWUMo3ytZrRUq3wqfFGe"), "info", new Nat(1)).to_mich(f))).toBe('{"prim":"Pair","args":[{"string":"KT1PkBvorKLwdrP3UWUMo3ytZrRUq3wqfFGe"},{"string":"info"},{"int":"1"}]}')
      });
    });

  })

  describe('Duration', () => {

    test('Fails with empty string', () => {
      expect(() => { new Duration("") }).toThrow("Invalid duration input. Received input: `' Try this format: '_w_d_h_m_s'.")
    });

    test('Fails with dummy string', () => {
      expect(() => { new Duration("dummy") }).toThrow("Invalid duration input. Received input: `dummy' Try this format: '_w_d_h_m_s'.")
    });

    test('Fails with number string', () => {
      expect(() => { new Duration("0") }).toThrow("Invalid duration input. Received input: `0' Try this format: '_w_d_h_m_s'.")
    });

    it('Simple test', () => {
      expect(new Duration("0s").toSecond()).toBe(0)
    })

    it('1 second test', () => {
      expect(new Duration("1s").toSecond()).toBe(1)
    })

    it('1 minute test', () => {
      expect(new Duration("1m").toSecond()).toBe(60)
    })

    it('1 hour test', () => {
      expect(new Duration("1h").toSecond()).toBe(3600)
    })

    it('1 day test', () => {
      expect(new Duration("1d").toSecond()).toBe(86400)
    })

    it('1 week test', () => {
      expect(new Duration("1w").toSecond()).toBe(604800)
    })

    it('1 week, 1 day, 1 hour, 1 minute, 1 second test', () => {
      expect(new Duration("1w1d1h1m1s").toSecond()).toBe(694861)
    })

    it('3 weeks, 8 days, 4 hours, 34 minutes, 18 seconds test', () => {
      expect(new Duration("3w8d4h34m18s").toSecond()).toBe(2522058)
    })

  })
})

