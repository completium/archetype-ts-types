import { BigNumber } from 'bignumber.js'

/* Michleline -------------------------------------------------------------- */

export type Mprim = {
  "prim": "True" | "False" | "None" | "Unit"
}

export type Mstring = {
  "string": string
}

export type Mbytes = {
  "bytes": string
}

export type Mint = {
  "int": string
}

export type Mpair = {
  "prim": "Pair",
  "args": Array<Micheline>
}

export type Melt = {
  "prim": "Elt",
  "args": [Micheline, Micheline]
}

export type Msingle = {
  "prim": "Some" | "Right" | "Left",
  "args": [Micheline]
}

export type Marray = Array<Micheline>

export type Micheline =
  | Mprim
  | Mstring
  | Mbytes
  | Mint
  | Msingle
  | Mpair
  | Melt
  | Marray

/* Michleline Type --------------------------------------------------------- */

export type MTprim = {
  "prim": "address" | "bls12_381_fr" | "bls12_381_g1" | "bls12_381_g2" | "bool" | "bytes" |
  "chain_id" | "chest" | "chest_key" | "int" | "key" | "key_hash" | "mutez" | "nat" |
  "never" | "operation" | "signature" | "string" | "timestamp" | "tx_rollup_l2_address" | "unit"
  "annots"?: Array<string>
}

export type MTsingle = {
  "prim": "contract" | "list" | "option" | "set" | "ticket",
  "args": [MichelineType]
  "annots"?: Array<string>
}

export type MTint = {
  "prim": "sapling_transaction" | "sapling_state",
  "args": [
    { "int": string }
  ]
  "annots"?: Array<string>
}

export type MTPairArray = {
  "prim": "pair",
  "args": Array<MichelineType>
  "annots"?: Array<string>
}

export type MTpair = {
  "prim": "big_map" | "lambda" | "map" | "or",
  "args": [MichelineType, MichelineType]
  "annots"?: Array<string>
}

export type MichelineType =
  | MTprim
  | MTsingle
  | MTint
  | MTpair
  | MTPairArray

export type ArchetypeTypeArg = ArchetypeType | Array<ArchetypeTypeArg> | string | Date | boolean

export interface DeployResult {
  address: string
}

export interface OriginateResult {
  address: string
}

export interface CallResult {
  dummy: number
}

export interface BatchResult {
  dummy: number
}

export interface GetterResult {
  value: any
  dummy: number
}

export interface ViewResult {
  value: any
  dummy: number
}

export interface TransferResult {
  dummy: number
}

export interface CallParameter {
  destination: Address,
  amount: Tez,
  fee?: Tez,
  entrypoint: string,
  arg: Micheline
}

/* Archetype value */

export abstract class ArchetypeType {
  abstract toString(): string
}

/* Constants --------------------------------------------------------------- */

export const none_mich: Micheline = {
  "prim": "None"
}

export const some_to_mich = (a: Micheline): Micheline => {
  return {
    prim: "Some",
    args: [a]
  }
}

/* Utils ------------------------------------------------------------------- */

export const list_equals = <T>(l1: Array<T>, l2: Array<T>, cmp: { (e1: T, e2: T): boolean }): boolean => {
  if (l1.length == l2.length) {
    for (let i = 0; i < l1.length; i++) {
      if (!cmp(l1[i], l2[i])) {
        return false
      }
    }
    return true
  }
  return false
}

export const getter_args_to_mich = (arg: Micheline, callback: Entrypoint): Micheline => {
  return pair_to_mich([arg, callback.to_mich()]);
}

/* Int Nat Entrypoint Classes ---------------------------------------------- */

export class Address implements ArchetypeType {
  private _content: string
  constructor(v: string) {
    this._content = v
    /* TODO check address format */
  }
  to_mich(): Micheline {
    return string_to_mich(this._content)
  }
  equals(a: Address): boolean {
    return this._content == a.toString()
  }
  toString(): string {
    return this._content
  }
}

export class Bls12_381_fr implements ArchetypeType {
  private _content: string
  constructor(v: string) {
    /* TODO check value validity */
    this._content = v
  }
  to_mich(): Micheline {
    return {
      "bytes": this._content
    }
  }
  equals = (x: Bls12_381_fr): boolean => {
    return this._content == x.toString()
  }
  toString = (): string => {
    return this._content
  }
}

export class Bls12_381_g1 implements ArchetypeType {
  private _content: string
  constructor(v: string) {
    /* TODO check value validity */
    this._content = v
  }
  to_mich(): Micheline {
    return {
      "bytes": this._content
    }
  }
  equals = (x: Bls12_381_g1): boolean => {
    return this._content == x.toString()
  }
  toString = (): string => {
    return this._content
  }
}

export class Bls12_381_g2 implements ArchetypeType {
  private _content: string
  constructor(v: string) {
    /* TODO check value validity */
    this._content = v
  }
  to_mich(): Micheline {
    return {
      "bytes": this._content
    }
  }
  equals = (x: Bls12_381_g2): boolean => {
    return this._content == x.toString()
  }
  toString = (): string => {
    return this._content
  }
}

export class Bytes implements ArchetypeType {
  private _content: string
  constructor(v: string) {
    /* TODO check value validity */
    this._content = v
  }
  to_mich(): Micheline {
    return {
      "bytes": this._content
    }
  }
  equals = (x: Bytes): boolean => {
    return this._content == x.toString()
  }
  toString = (): string => {
    return this._content
  }
  /**
   * Encode string to hexadecimal bytes
   * @param s string to encode
   * @returns new bytes object
   */
  static hex_encode(s: string): Bytes {
    const output = Buffer.from(s).toString('hex')
    return new Bytes(output)
  }
  /**
   * Decodes hexadecimal bytes to string
   * @returns decoded string
   */
  hex_decode = (): string => {
    const output = Buffer.from(this._content, 'hex').toString();
    return output
  }
}

export class Chain_id implements ArchetypeType {
  private _content: string
  constructor(v: string) {
    /* TODO check value validity */
    this._content = v
  }
  to_mich(): Micheline {
    return {
      "string": this._content
    }
  }
  equals = (x: Chain_id): boolean => {
    return this._content == x.toString()
  }
  toString = (): string => {
    return this._content
  }
}

export class Chest implements ArchetypeType {
  private _content: string
  constructor(v: string) {
    /* TODO check value validity */
    this._content = v
  }
  to_mich(): Micheline {
    return {
      "bytes": this._content
    }
  }
  equals = (x: Chest): boolean => {
    return this._content == x.toString()
  }
  toString = (): string => {
    return this._content
  }
}

export class Chest_key implements ArchetypeType {
  private _content: string
  constructor(v: string) {
    /* TODO check value validity */
    this._content = v
  }
  to_mich(): Micheline {
    return {
      "bytes": this._content
    }
  }
  equals = (x: Chest_key): boolean => {
    return this._content == x.toString()
  }
  toString = (): string => {
    return this._content
  }
}

export class Duration implements ArchetypeType {
  private _content: number
  constructor(v: string) {
    this._content = 0
    /* TODO converts Archetype duration literal to number of seconds */
  }
  to_mich(): Micheline {
    return { "int": this._content.toString() }
  }
  equals(a: Duration): boolean {
    return this._content.toString() == a.toString()
  }
  toString(): string {
    return this._content.toString()
  }
}

export class Entrypoint implements ArchetypeType {
  addr: string
  name: string
  constructor(a: Address, n: string) {
    this.addr = a.toString()
    this.name = n
  }
  to_mich = (): Micheline => {
    return string_to_mich(this.toString())
  }
  equals = (x: Entrypoint): boolean => {
    return this.addr == x.addr && this.name == x.name
  }
  toString(): string {
    return this.addr + '%' + this.name
  }
}

export abstract class Enum<T> implements ArchetypeType {
  constructor(private _kind: T) { }
  type() { return this._kind }
  abstract to_mich(): Micheline
  abstract toString(): string
}

export class Int implements ArchetypeType {
  private _content: BigNumber
  constructor(v: string | number | BigNumber) {
    this._content = new BigNumber(v)
    if (this._content.comparedTo(this._content.integerValue()) != 0) {
      throw new Error("Not an Int value: " + v.toString())
    } else {
      this._content = new BigNumber(v)
    }
  }
  to_mich = (): Micheline => {
    return { "int": this._content.toFixed() }
  }
  to_big_number(): BigNumber {
    return this._content
  }
  to_number(): number {
    return this._content.toNumber()
  }
  plus(x: Int): Int {
    return new Int(this._content.plus(x.to_big_number()))
  }
  minus(x: Int): Int {
    return new Int(this._content.minus(x.to_big_number()))
  }
  times(x: Int): Int {
    return new Int(this._content.times(x.to_big_number()))
  }
  div(x: Int): BigNumber {
    return this._content.div(x.to_big_number())
  }
  equals = (x: Int): boolean => {
    return this._content.isEqualTo(x.to_big_number())
  }
  toString(): string {
    return this._content.toFixed()
  }
}

export class Key implements ArchetypeType {
  private _content: string
  constructor(v: string) {
    /* TODO check value validity */
    this._content = v
  }
  to_mich(): Micheline {
    return {
      "string": this._content
    }
  }
  equals = (x: Key): boolean => {
    return this._content == x.toString()
  }
  toString = (): string => {
    return this._content
  }
}

export class Key_hash implements ArchetypeType {
  private _content: string
  constructor(v: string) {
    /* TODO check value validity */
    this._content = v
  }
  to_mich(): Micheline {
    return {
      "string": this._content
    }
  }
  equals = (x: Key_hash): boolean => {
    return this._content == x.toString()
  }
  toString = (): string => {
    return this._content
  }
}

export class Nat implements ArchetypeType {
  private _content: BigNumber
  constructor(v: string | number | BigNumber) {
    this._content = new BigNumber(v)
    if (this._content.comparedTo(this._content.integerValue()) != 0 || this._content.isLessThan(new BigNumber(0))) {
      throw new Error("Not an Nat value: " + v.toString())
    }
  }
  to_mich = (): Micheline => {
    return { "int": this._content.toFixed() }
  }
  to_big_number(): BigNumber {
    return this._content
  }
  to_number(): number {
    return this._content.toNumber()
  }
  plus(x: Nat): Nat {
    return new Nat(this._content.plus(x.to_big_number()))
  }
  minus(x: Nat): Int {
    return new Int(this._content.minus(x.to_big_number()))
  }
  times(x: Nat): Nat {
    return new Nat(this._content.times(x.to_big_number()))
  }
  div(x: Nat): Rational {
    return new Rational(this._content.div(x.to_big_number()))
  }
  equals = (x: Nat): boolean => {
    return this._content.isEqualTo(x.to_big_number())
  }
  toString = () => {
    return this._content.toFixed()
  }
}

export class Option<T extends ArchetypeTypeArg> implements ArchetypeType {
  _content: T | undefined | null
  constructor(v: T | undefined | null) {
    this._content = v
  }
  static None = <T extends ArchetypeTypeArg>() => { return new Option<T>(null) }
  static Some = <T extends ArchetypeTypeArg>(v: T) => { return new Option<T>(v) }
  get = (): T => {
    if (this._content != undefined && this._content != null) {
      return this._content
    } else {
      throw new Error("Option.get : is none")
    }
  }
  is_none(): boolean {
    return this._content == undefined || this._content == null
  }
  is_some(): boolean {
    return this._content != undefined && this._content != null
  }
  to_mich = (f: ((_: T) => Micheline)): Micheline => {
    if (this._content == undefined || this._content == null) {
      return none_mich
    }
    const mich = f(this._content)
    return some_to_mich(mich)
  };
  equals = (o: Option<T>) => {
    return this.toString() == o.toString()
  }
  toString = (): string => {
    if (this._content == undefined || this._content == null) {
      return "None"
    } else {
      let str: string
      switch (typeof this._content) {
        case "string": str = this._content; break;
        case "boolean": str = this._content.toString(); break;
        case "object": {
          // js hack ...
          if (this._content instanceof Date) {
            const d = this._content
            str = d.toISOString()
          } else {
            str = this._content.toString()
          }
          break
        }
      }
      return "Some (" + str + ")"
    }
  };
}

export class Or<T1 extends ArchetypeTypeArg, T2 extends ArchetypeTypeArg> implements ArchetypeType {
  _content: T1 | T2
  _is_left: boolean
  constructor(v: T1 | T2, is_left: boolean) {
    this._content = v
    this._is_left = is_left
  }
  static Left = <T1 extends ArchetypeTypeArg, T2 extends ArchetypeTypeArg>(v: T1) => { return new Or<T1, T2>(v, true) }
  static Right = <T1 extends ArchetypeTypeArg, T2 extends ArchetypeTypeArg>(v: T2) => { return new Or<T1, T2>(v, false) }
  get = (): T1 | T2 => {
    if (this._content != undefined && this._content != null) {
      return this._content
    } else {
      throw new Error("Or.get : is not defined")
    }
  }
  is_left() { return this._is_left }
  is_right() { return !this.is_left }
  to_mich(f_left: ((_: T1) => Micheline), f_right: ((_: T2) => Micheline)): Micheline {
    if (this.is_left()) {
      const c_left: T1 = this._content as T1;
      const mich = f_left(c_left)
      return left_to_mich(mich)
    } else {
      const c_right: T2 = this._content as T2;
      const mich = f_right(c_right)
      return right_to_mich(mich)
    }
  }
  toString(): string {
    let str: string
    switch (typeof this._content) {
      case "string": str = this._content; break;
      case "boolean": str = this._content.toString(); break;
      case "object":
        // js hack ...
        if (this._content instanceof Date) {
          const d = this._content
          str = d.toISOString()
        } else {
          str = this._content.toString()
        }
    }
    if (this.is_left()) {
      return "Left (" + str + ")"
    } else {
      return "Right (" + str + ")"
    }
  }
  equals = (o: Or<T1, T2>) => {
    return this.toString() == o.toString()
  }
}

export class Rational implements ArchetypeType {
  private _content: BigNumber
  constructor(v: string | number | BigNumber, denom: BigNumber = new BigNumber(1)) {
    let numerator: string | number | BigNumber = v
    switch (typeof v) {
      case "string": {
        const parsed = v.endsWith('%') ? parseFloat(v) / 100 : v
        if (null !== parsed && !Number.isNaN(parsed)) {
          numerator = parsed
        } else {
          throw new Error("Rational error: '" + v + "' not a number")
        }
        break;
      }
    }
    this._content = (new BigNumber(numerator)).div(denom)
  }
  to_mich = (): Micheline => {
    const [num, denom] = this._content.toFraction()
    return {
      prim: "Pair",
      args: [
        { "int": num.toFixed() },
        { "int": denom.toFixed() }
      ]
    }
  }
  to_big_number(): BigNumber {
    return this._content
  }
  to_number(): number {
    return this._content.toNumber()
  }
  plus(x: Rational): Rational {
    return new Rational(this._content.plus(x.to_big_number()))
  }
  minus(x: Rational): Rational {
    return new Rational(this._content.minus(x.to_big_number()))
  }
  times(x: Rational): Rational {
    return new Rational(this._content.times(x.to_big_number()))
  }
  div(x: Rational): Rational {
    return new Rational(this._content.div(x.to_big_number()))
  }
  floor(): Int {
    return new Int(this._content.integerValue(BigNumber.ROUND_FLOOR))
  }
  ceil(): Int {
    return new Int(this._content.integerValue(BigNumber.ROUND_CEIL))
  }
  equals = (x: Rational): boolean => {
    return this._content.isEqualTo(x.to_big_number())
  }
  toString = (): string => {
    return this._content.toFixed()
  }
}

export class Sapling_state implements ArchetypeType {
  private _content: string
  constructor(v: string) {
    /* TODO check value validity */
    this._content = v
  }
  to_mich(): Micheline {
    return {
      "bytes": this._content
    }
  }
  equals = (x: Sapling_state): boolean => {
    return this._content == x.toString()
  }
  toString = (): string => {
    return this._content
  }
}

export class Sapling_transaction implements ArchetypeType {
  private _content: string
  constructor(v: string) {
    /* TODO check value validity */
    this._content = v
  }
  to_mich(): Micheline {
    return {
      "bytes": this._content
    }
  }
  equals = (x: Sapling_transaction): boolean => {
    return this._content == x.toString()
  }
  toString = (): string => {
    return this._content
  }
}

export class Signature implements ArchetypeType {
  private _content: string
  constructor(v: string) {
    /* TODO check value validity */
    this._content = v
  }
  to_mich(): Micheline {
    return {
      "string": this._content
    }
  }
  equals = (x: Signature): boolean => {
    return this._content == x.toString()
  }
  toString = (): string => {
    return this._content
  }
}

export class Tez implements ArchetypeType {
  private _content: BigNumber
  constructor(v: string | number | BigNumber, unit: "tez" | "mutez" = "tez") {
    this._content = new BigNumber(v)
    switch (unit) {
      case "mutez":
        if (this._content.comparedTo(this._content.integerValue()) != 0)
          throw new Error("Mutez value must be integer");
        break
      case "tez":
        if (this._content.isLessThan(new BigNumber(0)) || this._content.isGreaterThan(new BigNumber("")))
          throw new Error("Invalid Tez value")
        this._content = new BigNumber(this._content.times(1000000).integerValue(BigNumber.ROUND_FLOOR))
    }
  }
  to_mich = (): Micheline => {
    return { "int": this.toString() }
  }
  to_big_number(): BigNumber {
    return this._content
  }
  plus(x: Tez): Tez {
    return new Tez(this._content.plus(x.to_big_number()), "mutez")
  }
  times(x: Nat): Tez {
    return new Tez(this._content.times(x.to_big_number()), "mutez")
  }
  equals = (x: Tez): boolean => {
    return this._content.isEqualTo(x.to_big_number())
  }
  toString = (): string => {
    return this._content.toFixed()
  }
}

export class Tx_rollup_l2_address implements ArchetypeType {
  private _content: string
  constructor(v: string) {
    this._content = v
    /* TODO check address format */
  }
  to_mich(): Micheline {
    return string_to_mich(this._content)
  }
  equals(a: Tx_rollup_l2_address): boolean {
    return this._content == a.toString()
  }
  toString(): string {
    return this._content
  }
}

export class Unit implements ArchetypeType {
  to_mich(): Micheline {
    return {
      "prim": "Unit"
    }
  }
  equals = (x: Unit): boolean => {
    return true
  }
  toString = (): string => {
    return "Unit"
  }
}

/* to Micheline ------------------------------------------------------------ */

export const prim_to_mich_type = (
  p: "address" | "bls12_381_fr" | "bls12_381_g1" | "bls12_381_g2" | "bool" | "bytes" |
    "chain_id" | "chest" | "chest_key" | "int" | "key" | "key_hash" | "mutez" | "nat" |
    "never" | "operation" | "signature" | "string" | "timestamp" | "tx_rollup_l2_address" | "unit"): MichelineType => {
  return {
    prim: p,
    annots: []
  }
}

export const prim_annot_to_mich_type = (
  p: "address" | "bls12_381_fr" | "bls12_381_g1" | "bls12_381_g2" | "bool" | "bytes" |
    "chain_id" | "chest" | "chest_key" | "int" | "key" | "key_hash" | "mutez" | "nat" |
    "never" | "operation" | "signature" | "string" | "timestamp" | "tx_rollup_l2_address" | "unit",
  a: Array<string>): MichelineType => {
  return {
    prim: p,
    annots: a
  }
}

export const unit_mich: Micheline = { prim: "Unit" }

export const unit_to_mich = (): Micheline => {
  return unit_mich
}

export const string_to_mich = (v: string): Micheline => {
  return { "string": v }
}

export const bool_to_mich = (v: boolean): Micheline => {
  return v ? { "prim": "True" } : { "prim": "False" }
}

export const date_to_mich = (v: Date): Micheline => {
  return { "int": Math.floor(v.getTime() / 1000).toString() }
}

export const elt_to_mich = (a: Micheline, b: Micheline): Micheline => {
  return {
    prim: "Elt",
    args: [a, b]
  }
}

export const left_to_mich = (v: Micheline): Micheline => {
  return {
    prim: "Left",
    args: [v]
  }
}

export const right_to_mich = (v: Micheline): Micheline => {
  return {
    prim: "Right",
    args: [v]
  }
}

export const or_to_mich_type = (l: MichelineType, r: MichelineType, a: string[] = []): MichelineType => {
  return {
    prim: "or",
    args: [l, r],
    annots: a
  }
}

export const pair_to_mich = (l: Array<Micheline>): Micheline => {
  return {
    prim: "Pair",
    args: l
  }
}

export const pair_to_mich_type = (prim: "big_map" | "lambda" | "map" | "or", a: MichelineType, b: MichelineType): MichelineType => {
  return {
    prim: prim,
    args: [a, b],
    annots: []
  }
}

export const pair_array_to_mich_type = (l: Array<MichelineType>, annots: Array<string> = []): MichelineType => {
  return {
    prim: "pair",
    args: l,
    annots: annots
  }
}

export const mich_array_to_mich = (l: Array<Micheline>): Micheline => {
  if (l.length == 1) {
    return l[0]
  }
  if (l.length == 2) {
    return pair_to_mich(l)
  } else {
    return pair_to_mich([l[0], mich_array_to_mich(l.slice(1))])
  }
}

export const option_to_mich_type = (a: MichelineType): MichelineType => {
  return {
    prim: "option",
    args: [a],
    annots: []
  }
}

export const option_annot_to_mich_type = (mt: MichelineType, a: Array<string>): MichelineType => {
  return {
    prim: "option",
    args: [mt],
    annots: a
  }
}

export const list_to_mich = <T>(l: Array<T>, to_mich: { (a: T): Micheline }): Micheline => {
  return l.map(x => to_mich(x))
}

export const list_to_mich_type = (mt: MichelineType): MichelineType => {
  return {
    prim: "list",
    args: [mt],
    annots: []
  }
}

export const list_annot_to_mich_type = (mt: MichelineType, a: Array<string>): MichelineType => {
  return {
    prim: "list",
    args: [mt],
    annots: a
  }
}

export const set_to_mich = <T>(s: Set<T>, to_json: { (a: T): Micheline }) => {
  Array.from(s.values()).map(x => to_json(x))
}

export const string_cmp = (a: string, b: string) => {
  if (a === b) {
    return 0;
  }
  return a < b ? -1 : 1;
};

export const mich_to_pairs = (x: Micheline): Array<Micheline> => {
  return (x as Mpair)["args"]
}

export const annotated_mich_to_array = (x: Micheline, t: MichelineType): Array<Micheline> => {
  const internal_mich_to_array = (x: Micheline, t: MichelineType, acc: Array<Micheline>): Array<Micheline> => {
    if (t.annots && t.annots.length > 0) {
      acc.push(x)
      return acc
    } else {
      switch (t.prim) {
        case "pair": {
          const pair = (x as Mpair)
          return (pair.args.reduce((a: Array<Micheline>, x: Micheline, i: number) => {
            return internal_mich_to_array(x, t.args[i], a)
          }, acc));
        }
        default: throw new Error("internal_mich_to_array: found an unannotated node that is not a pair but a '" + t.prim + "'")
      }
    }
  }
  return internal_mich_to_array(x, t, [])
}

export const mich_to_string = (x: Micheline): string => {
  return (x as Mstring)["string"]
}

export const mich_to_date = (x: Micheline): Date => {
  return new Date((x as Mstring)["string"])
}

export const mich_to_int = (x: Micheline): Int => {
  return new Int((x as Mint)["int"])
}

export const mich_to_nat = (x: Micheline): Nat => {
  return new Nat((x as Mint)["int"])
}

export const mich_to_signature = (x: Micheline): Signature => {
  return new Signature((x as Mstring)["string"])
}

export const mich_to_key = (x: Micheline): Key => {
  return new Key((x as Mstring)["string"])
}

export const mich_to_tez = (x: Micheline): Tez => {
  return new Tez((x as Mint)["int"], "mutez")
}

export const mich_to_bytes = (x: Micheline): Bytes => {
  return new Bytes((x as Mbytes)["bytes"])
}

export const mich_to_duration = (x: Micheline): Duration => {
  return new Duration((x as Mint)["int"])
}

export const mich_to_address = (x: Micheline): Address => {
  return new Address((x as Mstring)["string"])
}

export const mich_to_tx_rollup_l2_address = (x: Micheline): Tx_rollup_l2_address => {
  return new Tx_rollup_l2_address((x as Mstring)["string"])
}

export const mich_to_bool = (x: Micheline): boolean => {
  switch ((x as Mprim).prim) {
    case "False": return false
    case "True": return true
    default: throw new Error("mich_to_bool: invalid prim '" + (x as Mprim).prim + "'")
  }
}

export const mich_to_bls12_381_fr = (x: Micheline): Bls12_381_fr => {
  return new Bls12_381_fr((x as Mbytes)["bytes"])
}

export const mich_to_bls12_381_g1 = (x: Micheline): Bls12_381_g1 => {
  return new Bls12_381_g1((x as Mbytes)["bytes"])
}

export const mich_to_bls12_381_g2 = (x: Micheline): Bls12_381_g2 => {
  return new Bls12_381_g2((x as Mbytes)["bytes"])
}

export const mich_to_chain_id = (x: Micheline): Chain_id => {
  return new Chain_id((x as Mstring)["string"])
}

export const mich_to_chest = (x: Micheline): Chest => {
  return new Chest((x as Mbytes)["bytes"])
}

export const mich_to_chest_key = (x: Micheline): Chest_key => {
  return new Chest_key((x as Mbytes)["bytes"])
}

export const mich_to_key_hash = (x: Micheline): Key_hash => {
  return new Key_hash((x as Mstring)["string"])
}

export const mich_to_sapling_state = (x: Micheline): Sapling_state => {
  return new Sapling_state((x as Mbytes)["bytes"])
}

export const mich_to_sapling_transaction = (x: Micheline): Sapling_transaction => {
  return new Sapling_transaction((x as Mbytes)["bytes"])
}

export const mich_to_unit = (x: Micheline): Unit => {
  return new Unit()
}

export const mich_to_or = <T1 extends ArchetypeType, T2 extends ArchetypeType>(x: Micheline, mich_to_left: ((_: Micheline) => T1), mich_to_right: ((_: Micheline) => T2)): Or<T1, T2> => {
  const p = (x as Msingle);
  if (p.prim == "Left") {
    return Or.Left<T1, T2>(mich_to_left(p.args[0]))
  }
  if (p.prim == "Right") {
    return Or.Right<T1, T2>(mich_to_right(p.args[0]))
  }
  throw new Error(`mich_to_or: Invalid prim ${p.prim}`)
}

export const mich_to_option = <T extends ArchetypeTypeArg>(x: Micheline, mich_to: (_: any) => T): Option<T> => {
  if ("prim" in x) {
    switch (x.prim) {
      case "None": return new Option<T>(undefined)
      case "Some": return new Option<T>(mich_to(x.args[0]))
    }
  }
  throw new Error("mich_to_option: prim not found")
}

export const mich_to_list = <T>(x: Micheline, mich_to: (_: Micheline) => T): Array<T> => {
  const xlist = (x as Marray)
  return xlist.map(mich_to)
}

export const mich_to_rational = (x: Micheline): Rational => {
  const numerator = new BigNumber(((x as Mpair).args[0] as Mint)["int"])
  const denominator = new BigNumber(((x as Mpair).args[1] as Mint)["int"])
  return new Rational(numerator.dividedBy(denominator))
}

export const mich_to_map = <K, V>(x: Micheline, f: { (k: Micheline, v: Micheline): [K, V] }): Array<[K, V]> => {
  return (x as Marray).map((elt: Micheline) => {
    const k = (elt as Melt)["args"][0]
    const v = (elt as Melt)["args"][1]
    return f(k, v)
  })
}

export const is_left = (x: Micheline): boolean => {
  return (x as Msingle)["prim"] == "Left"
}

export const is_right = (x: Micheline): boolean => {
  return (x as Msingle)["prim"] == "Right"
}

export const mich_to_or_value = (x: Micheline): Micheline => {
  return (x as Msingle)["args"][0]
}

export const cmp_date = (a: Date, b: Date): boolean => {
  return (a.getTime() - a.getMilliseconds()) == (b.getTime() - b.getMilliseconds())
}
