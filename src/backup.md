# Backup

## Terms

**DRP** --- Disaster Recovery Planning

What happens if the primary facility fails?

i.e. The computer you stored the data is ... is stolen?

**MTD** --- Maximum Tolerable Downtime

Political. How much downtime is OK for the system owner?

**RTO** -- Recovery Time Objective

Technical. How quickly can the system be restored?

**RPO** --- Recovery Point Objective

Political. How old is a backup allowed to be?

## What is backup?

**Deduplication**

The backup method should be able to chuck data, so it can tell what has changed vs what hasn't.

Ten copies of the same VM should not be 10x the space.

**Encryption**

Backups contain sensitive materials, they should not be cleartext

**Immutability**

The backups should not be easy to modify once created.

## Rules

**3-2-1**

- Three copies
- Two media types
- 1 off-site

### Media types

Don't put everything onto the same brand of hard drive ... if that brand has a catastrophic failure ... it's all gone.

### Off site

This does not mean your neighbor's house. Off-site should ideally be in a different geo-political.

## References

[Self-Hoster's Disaster Recovery: When Everything Goes Wrong at Once | SumGuy's Ramblings](https://sumguy.com/disaster-recovery-planning-rto-rpo/)

[NIST 800-34 - Contingency Planning Guide for Federal Information Systems](https://doi.org/10.6028/NIST.SP.800-34r1)

[NIST 800-209 - Security Guidelines for Storage Infrastructure](https://doi.org/10.6028/NIST.SP.800-209)
