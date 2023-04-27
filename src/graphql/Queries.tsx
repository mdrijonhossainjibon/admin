import { gql } from "@apollo/client";

export const AdminListUsersGQL = gql`
  query AdminListUsers(
    $_barong_session: String
    $uid: String
    $email: String
    $role: String
    $first_name: String
    $last_name: String
    $country: String
    $level: Int
    $state: String
    $range: String
    $from: String
    $to: String
    $page: Int
    $limit: Int
  ) {
    adminUsers(
      _barong_session: $_barong_session
      uid: $uid
      email: $email
      role: $role
      first_name: $first_name
      last_name: $last_name
      country: $country
      level: $level
      state: $state
      range: $range
      from: $from
      to: $to
      page: $page
      limit: $limit
    ) {
      page
      perPage
      total
      result {
        uid
        role
        email
        level
        profiles {
          last_name
          first_name
          country
        }
        created_at
        updated_at
        state
        otp
        referral_uid
      }
    }
  }
`;

export const AdminSimpleUserGQL = gql`
  query AdminSimpleUser($_barong_session: String, $uid: String) {
    adminUserWithoutActivities(_barong_session: $_barong_session, uid: $uid) {
      uid
      email
      role
      level
      otp
      state
      referral_uid
      labels {
        key
        value
        scope
        created_at
        updated_at
      }
      data
      created_at
      updated_at
      phones {
        country
        number
        validated_at
      }
      profiles {
        first_name
        last_name
        dob
        address
        postcode
        city
        country
        state
        metadata
      }
      documents {
        doc_expire
        doc_number
        doc_type
        metadata
        created_at
        updated_at
        upload {
          url
        }
      }
    }
  }
`;

export const AdminUserActivitiesGQL = gql`
  query AdminUserActivities(
    $_barong_session: String
    $uid: String
    $page: String
    $limit: String
    $action: String
    $topic: String
    $from: String
    $to: String
  ) {
    adminUserActivities(
      _barong_session: $_barong_session
      uid: $uid
      page: $page
      limit: $limit
      action: $action
      topic: $topic
      from: $from
      to: $to
    ) {
      page
      total
      perPage
      result {
        action
        created_at
        data
        result
        topic
        user_agent
        user_ip
      }
    }
  }
`;

export const AdminPendingGQL = gql`
  query AdminPending(
    $_barong_session: String
    $uid: String
    $email: String
    $role: String
    $first_name: String
    $last_name: String
    $country: String
    $level: Int
    $state: String
    $range: String
    $from: String
    $to: String
    $page: Int
    $limit: Int
  ) {
    adminPending(
      _barong_session: $_barong_session
      uid: $uid
      email: $email
      role: $role
      first_name: $first_name
      last_name: $last_name
      country: $country
      level: $level
      state: $state
      range: $range
      from: $from
      to: $to
      page: $page
      limit: $limit
    ) {
      page
      perPage
      total
      result {
        uid
        data
        role
        email
        level
        profiles {
          last_name
          first_name
          country
          address
          city
          country
          dob
          metadata
          postcode
          state
          created_at
          updated_at
        }
        created_at
        updated_at
        state
        otp
        referral_uid
        documents {
          doc_expire
          doc_number
          doc_type
          metadata
          created_at
          upload {
            url
          }
        }
      }
    }
  }
`;

export const SelfUserGQL = gql`
  query SelfUser($_barong_session: String) {
    userWithProfile(_barong_session: $_barong_session) {
      uid
      email
      role
      level
      otp
      state
    }
  }
`;

export const AdminMetricsGQL = gql`
  query AdminMetrics($_barong_session: String) {
    adminMetrics(_barong_session: $_barong_session) {
      usersTotal
      users24H
      depositsTotal
      deposits24H
      withdrawsTotal
      withdraws24H
      tradesTotal
      trades24H
      ordersTotal
      ordersTotalPending
      orders24H
      orders24HFilled
      orders24HPartialFilled
    }
  }
`;

export const AdminUserGQL = gql`
  query AdminUser($_barong_session: String, $userId: String, $activityPage: Int, $activityLimit: Int) {
    adminUser(_barong_session: $_barong_session, userId: $userId) {
      uid
      email
      role
      level
      otp
      state
      referral_uid
      labels {
        key
        value
        scope
        created_at
        updated_at
      }
      data
      created_at
      updated_at
      phones {
        country
        number
        validated_at
      }
      profiles {
        first_name
        last_name
        dob
        address
        postcode
        city
        country
        state
        metadata
      }
      activities(page: $activityPage, limit: $activityLimit) {
        action
        created_at
        data
        result
        topic
        user_agent
        user_ip
      }
      documents {
        doc_expire
        doc_number
        doc_type
        metadata
        created_at
        updated_at
        upload {
          url
        }
      }
    }
  }
`;

export const AdminUserByLabelGQL = gql`
  query AdminUserByLabel($_barong_session: String, $key: String!, $value: String!) {
    adminUserByLabel(_barong_session: $_barong_session, key: $key, value: $value) {
      uid
      data
      email
      level
      otp
      profiles {
        first_name
        last_name
        dob
        address
        postcode
        city
        country
        state
        metadata
      }
      phones {
        country
        number
        validated_at
      }
      referral_uid
      role
      state
    }
  }
`;

export const AdminLabelsGQL = gql`
  query AdminLabels($_barong_session: String) {
    adminLabels(_barong_session: $_barong_session) {
      key
      scope
      value
      description
      created_at
      updated_at
    }
  }
`;

export const AdminLevelsGQL = gql`
  query AdminLevels($_barong_session: String) {
    adminLevels(_barong_session: $_barong_session) {
      id
      key
      value
    }
  }
`;

export const BlockchainsListGQL = gql`
  query AdminBlockchains($_barong_session: String) {
    adminBlockchains(_barong_session: $_barong_session) {
      id
      key
      name
      client
      height
      created_at
      enabled
      server
      explorer_address
      explorer_transaction
      min_confirmations
    }
  }
`;
export const BlockchainClientsListGQL = gql`
  query AdminBlockchainClientsList($_barong_session: String) {
    adminBlockchainClients(_barong_session: $_barong_session) {
      client
    }
  }
`;

export const AdminCurrenciesListGQL = gql`
  query AdminCurrenciesList($_barong_session: String) {
    adminCurrencies(_barong_session: $_barong_session) {
      code
      name
      symbol
      explorer_transaction
      explorer_address
      type
      deposit_enabled
      withdrawal_enabled
      deposit_fee
      min_deposit_amount
      withdraw_fee
      min_withdraw_amount
      withdraw_limit_24h
      withdraw_limit_72h
      base_factor
      precision
      position
      icon_url
      options {
        key
        value
      }
      min_confirmations
      created_at
      visible
    }
  }
`;

export const AdminCurrencySingleGQL = gql`
  query AdminCurrencySingle($_barong_session: String, $code: String!) {
    adminCurrency(_barong_session: $_barong_session, code: $code) {
      code
      name
      symbol
      explorer_transaction
      explorer_address
      type
      deposit_enabled
      withdrawal_enabled
      deposit_fee
      min_deposit_amount
      withdraw_fee
      min_withdraw_amount
      withdraw_limit_24h
      withdraw_limit_72h
      base_factor
      precision
      subunits
      position
      icon_url
      options {
        key
        value
      }
      min_confirmations
      created_at
      visible
      blockchain_key
      updated_at
      markets {
        id
        enabled
        name
        quote_unit
        base_unit
      }
      blockchain {
        id
        client
        key
        name
        server
        enabled
        height
        currencies {
          name
          code
          wallets {
            id
            currency_code
            kind
            name
            enabled
            address
            blockchain_key
            settings {
              uri
            }
            gateway
          }
        }
      }
      wallets {
        id
        currency_code
        kind
        name
        enabled
        address
      }
    }
  }
`;

export const AdminMarketsListGQL = gql`
  query AdminMarketsList($_barong_session: String) {
    adminMarkets(_barong_session: $_barong_session) {
      amount_precision
      base_unit
      created_at
      id
      max_price
      min_amount
      min_price
      name
      position
      price_precision
      quote_unit
      enabled
      updated_at
      base_currency {
        name
      }
      quote_currency {
        name
      }
    }
  }
`;

export const AdminMarketGQL = gql`
  query AdminMarket($_barong_session: String, $id: String) {
    adminMarket(_barong_session: $_barong_session, id: $id) {
      amount_precision
      base_unit
      created_at
      id
      max_price
      min_amount
      min_price
      name
      position
      price_precision
      quote_unit
      enabled
      updated_at
      base_currency {
        name
        visible
      }
      quote_currency {
        name
        visible
      }
    }
  }
`;

export const AdminWalletsListGQL = gql`
  query AdminWalletsList($_barong_session: String, $kind: String, $currency: String, $limit: Int, $page: Int) {
    adminWallets(_barong_session: $_barong_session, kind: $kind, currency: $currency, limit: $limit, page: $page) {
      total
      page
      perPage
      result {
        address
        blockchain_key
        currency_code
        gateway
        id
        kind
        max_balance
        name
        settings {
          uri
          secret
          access_token
          testnet
          wallet_id
        }
        enabled
        created_at
        updated_at
        currency {
          type
          code
          name
          explorer_address
        }
      }
    }
  }
`;

export const AdminWalletGQL = gql`
  query AdminWallet($_barong_session: String, $id: Int) {
    adminWallet(_barong_session: $_barong_session, id: $id) {
      address
      blockchain_key
      currency_code
      gateway
      id
      kind
      max_balance
      name
      settings {
        uri
        secret
        access_token
        testnet
        wallet_id
      }
      blockchain {
        name
        key
        id
        enabled
      }
      enabled
      created_at
      updated_at
      currency {
        visible
        type
        code
        name
        explorer_address
      }
    }
  }
`;

export const AdminWalletGatewaysGQL = gql`
  query AdminWalletGateways($_barong_session: String) {
    adminWalletGateways(_barong_session: $_barong_session) {
      gateway
    }
  }
`;

export const AdminTradingFeesGQL = gql`
  query AdminTradingFees($_barong_session: String) {
    adminTradingFees(_barong_session: $_barong_session) {
      id
      group
      market_id
      maker
      taker
      created_at
      updated_at
    }
  }
`;

export const BlockchainSingleGQL = gql`
  query BlockchainSingle($_barong_session: String, $id: Int!) {
    adminBlockchain(_barong_session: $_barong_session, id: $id) {
      id
      client
      explorer_address
      explorer_transaction
      height
      key
      min_confirmations
      name
      server
      enabled
      created_at
      updated_at
      currencies {
        code
        name
        visible
      }
    }
  }
`;

export const AdminDepositsGQL = gql`
  query AdminDeposits(
    $page: Int
    $limit: Int
    $state: String
    $type: String
    $uid: String
    $currency: String
    $ordering: String
    $order_by: String
  ) {
    adminDeposits(
      page: $page
      limit: $limit
      state: $state
      type: $type
      uid: $uid
      currency: $currency
      ordering: $ordering
      order_by: $order_by
    ) {
      page
      perPage
      total
      result {
        amount
        completed_at
        created_at
        email
        fee
        id
        state
        tid
        txid
        type
        uid
        updated_at
        currency_code
        confirmations
        currency {
          type
          explorer_transaction
        }
      }
    }
  }
`;
/*

	id: Int
	currency_code: String
	currency: AdminCurrency
	amount: Float
	fee: Float
	txid: String
	confirmations: Int
	state: String
	completed_at: String
	created_at: String
	tid: String
	member: AdminMember
	uid: String
	email: String
	address: String
	txout: Int
	block_number: Int
	type: String
	spread: String
	updated_at: String
*/

export const AdminSingleDepositGQL = gql`
  query AdminSingleDeposit($tid: String) {
    adminDeposit(tid: $tid) {
      id
      tid
      txout
      block_number
      spread
      state
      amount
      email
      fee
      type
      txid
      member {
        user {
          state
          uid
          email
          role
        }
      }
      currency {
        name
        code
        precision
        explorer_transaction
        visible
        blockchain {
          id
          name
          key
          enabled
        }
      }
    }
  }
`;

export const AdminWithdrawsGQL = gql`
  query AdminWithdraws(
    $_barong_session: String
    $state: [String]
    $id: Int
    $txid: String
    $tid: String
    $confirmations: Int
    $rid: String
    $uid: String
    $currency: String
    $type: String
    $range: String
    $from: String
    $to: String
    $page: Int
    $limit: Int
    $ordering: String
    $order_by: String
  ) {
    adminWithdraws(
      _barong_session: $_barong_session
      state: $state
      id: $id
      txid: $txid
      tid: $tid
      confirmations: $confirmations
      rid: $rid
      uid: $uid
      currency: $currency
      type: $type
      range: $range
      from: $from
      to: $to
      page: $page
      limit: $limit
      ordering: $ordering
      order_by: $order_by
    ) {
      page
      perPage
      total
      result {
        id
        currency {
          code
          type
          explorer_transaction
          explorer_address
        }
        type
        sum
        fee
        blockchain_txid
        rid
        state
        confirmations
        note
        created_at
        updated_at
        completed_at
        member {
          user {
            uid
            email
            profiles {
              first_name
              last_name
            }
          }
        }
        beneficiary {
          id
          name
          state
        }
        account
        block_number
        amount
        tid
      }
    }
  }
`;

export const AdminPermissionsGQL = gql`
  query AdminPermissions($_barong_session: String, $page: Int, $limit: Int) {
    adminPermissions(_barong_session: $_barong_session, page: $page, limit: $limit) {
      page
      perPage
      total
      result {
        id
        action
        path
        role
        topic
        verb
        created_at
        updated_at
      }
    }
  }
`;

export const AdminRestrictionsGQL = gql`
  query AdminRestrictions($_barong_session: String, $page: Int, $limit: Int) {
    adminRestrictions(_barong_session: $_barong_session, page: $page, limit: $limit) {
      page
      perPage
      total
      result {
        id
        scope
        state
        category
        value
        code
        created_at
        updated_at
      }
    }
  }
`;

export const AdminWithdrawGQL = gql`
  query AdminWithdraw($_barong_session: String, $id: Int) {
    adminWithdraw(_barong_session: $_barong_session, id: $id) {
      id
      currency {
        code
        type
        name
        visible
        explorer_transaction
        explorer_address
      }
      type
      sum
      fee
      blockchain_txid
      rid
      state
      confirmations
      note
      created_at
      updated_at
      completed_at

      member {
        user {
          uid
          email
          created_at
          state
          profiles {
            first_name
            last_name
          }
        }
        accounts {
          currency {
            code
          }
          balance
          locked
        }
      }
      beneficiary {
        id
        name
        state
        data {
          account_number
          bank_name
          bank_swift_code
          full_name
          intermediary_bank_name
          intermediary_bank_swift_code
          address
        }
      }
      account
      block_number
      amount
      tid
    }
  }
`;

export const AdminAdjustmentsGQL = gql`
  query AdminAdjustments(
    $_barong_session: String
    $currency: String
    $range: String
    $from: String
    $to: String
    $limit: Int
    $page: Int
    $ordering: String
    $order_by: String
    $state: String
    $category: String
  ) {
    adminAdjustments(
      _barong_session: $_barong_session
      currency: $currency
      range: $range
      from: $from
      to: $to
      limit: $limit
      page: $page
      ordering: $ordering
      order_by: $order_by
      state: $state
      category: $category
    ) {
      page
      perPage
      total
      result {
        id
        reason
        description
        category
        amount
        validator {
          uid
          email
          role
        }
        creator {
          uid
          email
          role
        }
        currency {
          code
          type
        }
        asset {
          id
          code
          member {
            uid
            email
          }
        }
        liability {
          id
          code
          member {
            uid
            email
          }
        }
        revenue {
          id
          code
          member {
            uid
            email
          }
        }
        expense {
          id
          code
          member {
            uid
            email
          }
        }
        state
        asset_account_code
        receiving_account_code
        receiving_member {
          uid
          email
          role
        }
        created_at
        updated_at
      }
    }
  }
`;

export const AdminAdjustmentGQL = gql`
  query AdminAdjustment($_barong_session: String, $id: Int) {
    adminAdjustment(_barong_session: $_barong_session, id: $id) {
      id
      reason
      description
      category
      amount
      validator {
        uid
        email
        role
      }
      creator {
        uid
        email
        role
      }
      currency {
        code
        type
      }
      asset {
        id
        code
        member {
          uid
          email
        }
      }
      liability {
        id
        code
        member {
          uid
          email
        }
      }
      revenue {
        id
        code
        member {
          uid
          email
        }
      }
      expense {
        id
        code
        member {
          uid
          email
        }
      }
      state
      asset_account_code
      receiving_account_code
      receiving_member {
        uid
        email
        role
      }
      created_at
      updated_at
    }
  }
`;

export const AdminAssetsGQL = gql`
  query AdminAssets(
    $_barong_session: String
    $reference_type: String
    $rid: Int
    $code: Int
    $currency: String
    $range: String
    $from: String
    $to: String
    $limit: Int
    $page: Int
    $ordering: String
    $order_by: String
  ) {
    adminAssets(
      _barong_session: $_barong_session
      reference_type: $reference_type
      rid: $rid
      code: $code
      currency: $currency
      range: $range
      from: $from
      to: $to
      limit: $limit
      page: $page
      order_by: $order_by
      ordering: $ordering
    ) {
      page
      perPage
      total
      result {
        id
        code
        currency {
          code
          type
        }
        credit
        debit
        member {
          uid
          role
          email
        }
        account_kind
        rid
        reference_type
        created_at
      }
    }
  }
`;

export const AdminExpensesGQL = gql`
  query AdminExpenses(
    $_barong_session: String
    $reference_type: String
    $rid: Int
    $code: Int
    $currency: String
    $range: String
    $from: String
    $to: String
    $limit: Int
    $page: Int
    $ordering: String
    $order_by: String
  ) {
    adminExpenses(
      _barong_session: $_barong_session
      reference_type: $reference_type
      rid: $rid
      code: $code
      currency: $currency
      range: $range
      from: $from
      to: $to
      limit: $limit
      page: $page
      ordering: $ordering
      order_by: $order_by
    ) {
      page
      perPage
      total
      result {
        id
        code
        currency {
          code
          type
        }
        credit
        debit
        member {
          uid
          role
          email
        }
        account_kind
        rid
        reference_type
        created_at
      }
    }
  }
`;

export const AdminRevenuesGQL = gql`
  query AdminRevenues(
    $_barong_session: String
    $reference_type: String
    $rid: Int
    $code: Int
    $currency: String
    $range: String
    $from: String
    $to: String
    $limit: Int
    $page: Int
    $ordering: String
    $order_by: String
  ) {
    adminRevenues(
      _barong_session: $_barong_session
      reference_type: $reference_type
      rid: $rid
      code: $code
      currency: $currency
      range: $range
      from: $from
      to: $to
      limit: $limit
      page: $page
      order_by: $order_by
      ordering: $ordering
    ) {
      page
      perPage
      total
      result {
        id
        code
        currency {
          type
          code
        }
        credit
        debit
        member {
          uid
          email
          role
        }
        account_kind
        rid
        reference_type
        created_at
      }
    }
  }
`;

export const AdminLiabilitiesGQL = gql`
  query AdminLiabilities(
    $_barong_session: String
    $reference_type: String
    $rid: Int
    $code: Int
    $currency: String
    $range: String
    $from: String
    $to: String
    $limit: Int
    $page: Int
    $ordering: String
    $order_by: String
  ) {
    adminLiabilities(
      _barong_session: $_barong_session
      reference_type: $reference_type
      rid: $rid
      code: $code
      currency: $currency
      range: $range
      from: $from
      to: $to
      limit: $limit
      page: $page
      ordering: $ordering
      order_by: $order_by
    ) {
      page
      perPage
      total
      result {
        id
        code
        currency {
          code
          type
        }
        credit
        debit
        member {
          uid
          email
          role
        }
        account_kind
        rid
        reference_type
        created_at
      }
    }
  }
`;

export const AdminOrdersGQL = gql`
  query AdminOrders(
    $_barong_session: String
    $market: String
    $state: String
    $ord_type: String
    $price: Float
    $origin_volume: Float
    $type: String
    $email: String
    $uid: String
    $range: String
    $from: String
    $to: String
    $limit: Int
    $page: Int
    $ordering: String
    $order_by: String
  ) {
    adminOrders(
      _barong_session: $_barong_session
      market: $market
      state: $state
      ord_type: $ord_type
      price: $price
      origin_volume: $origin_volume
      type: $type
      email: $email
      uid: $uid
      range: $range
      from: $from
      to: $to
      limit: $limit
      page: $page
      ordering: $ordering
      order_by: $order_by
    ) {
      page
      perPage
      total
      result {
        id
        uuid
        side
        ord_type
        price
        avg_price
        state
        market {
          id
          name
          base_currency {
            code
            type
          }
          quote_currency {
            code
            type
          }
          created_at
          updated_at
        }
        created_at
        updated_at
        origin_volume
        remaining_volume
        executed_volume
        trades_count
        user {
          uid
          role
          email
        }
      }
    }
  }
`;

export const AdminTradesGQL = gql`
  query AdminTrades(
    $_barong_session: String
    $market: String
    $uid: String
    $range: String
    $from: String
    $to: String
    $limit: Int
    $page: Int
    $ordering: String
    $order_by: String
  ) {
    adminTrades(
      _barong_session: $_barong_session
      market: $market
      uid: $uid
      range: $range
      from: $from
      to: $to
      limit: $limit
      page: $page
      ordering: $ordering
      order_by: $order_by
    ) {
      page
      perPage
      total
      result {
        id
        price
        amount
        total
        market {
          id
          name
          base_currency {
            code
            type
          }
          quote_currency {
            code
            type
          }
          created_at
          updated_at
        }
        taker_type
        maker {
          uid
          email
          role
        }
        maker_fee_currency
        maker_fee_amount
        taker {
          uid
          email
          role
        }
        taker_fee_currency
        taker_fee_amount
        created_at
      }
    }
  }
`;

export const AdminMembersGQL = gql`
  query AdminMembers(
    $_barong_session: String
    $state: String
    $role: String
    $group: String
    $email: String
    $uid: String
    $range: String
    $from: String
    $to: String
    $limit: Int
    $page: Int
    $ordering: String
    $order_by: String
  ) {
    adminMembers(
      _barong_session: $_barong_session
      uid: $uid
      state: $state
      role: $role
      group: $group
      email: $email
      range: $range
      from: $from
      to: $to
      limit: $limit
      page: $page
      ordering: $ordering
      order_by: $order_by
    ) {
      id
      user {
        uid
        email
        role
      }
      group
      created_at
      updated_at
      accounts {
        currency {
          code
          type
        }
        balance
        locked
      }
    }
  }
`;

export const AdminMemberGQL = gql`
  query AdminMember($_barong_session: String, $uid: String) {
    adminMember(_barong_session: $_barong_session, uid: $uid) {
      id
      user {
        uid
        email
        role
      }
      group
      created_at
      updated_at
      accounts {
        currency {
          code
          type
        }
        balance
        locked
      }
    }
  }
`;

export const AdminAvailableGroupsGQL = gql`
  query AdminAvailableGroups($_barong_session: String) {
    adminAvailableGroups(_barong_session: $_barong_session) {
      group
    }
  }
`;
