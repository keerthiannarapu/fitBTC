(define-token sip010-token)
(define-constant INSURANCE-WALLET 'ST1PQHQKV0RJXZFY1DGX8MNSNYVE3VGZJSRTPGZGM')

(define-map balances ((account principal)) ((balance uint)))

(define-public (mint (recipient principal) (amount uint))
  (begin
    (match (is-eq tx-sender recipient)
      true
      (ok (map-insert balances ((account recipient)) ((balance amount))))
      false (err "Unauthorized"))
  )
)

(define-public (transfer (sender principal) (recipient principal) (amount uint))
  (let
    ((sender-balance (default-to u0 (get balance (map-get? balances ((account sender))))))
     (recipient-balance (default-to u0 (get balance (map-get? balances ((account recipient))))))
    )
    (if (>= sender-balance amount)
      (begin
        (map-set balances ((account sender)) ((balance (- sender-balance amount))))
        (map-set balances ((account recipient)) ((balance (+ recipient-balance amount))))
        (ok true)
      )
      (err "Insufficient balance")
    )
  )
)

(define-public (pay-insurance (sender principal) (amount uint))
  (transfer sender INSURANCE-WALLET amount)
)

(define-read-only (eligible-for-discount (account principal))
  (let ((balance (default-to u0 (get balance (map-get? balances ((account account))))))
        (discount-threshold u0.0005)) ;; Discount threshold in BTC
    (ok (>= balance discount-threshold))
  )
)
