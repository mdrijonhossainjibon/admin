import { gql } from "@apollo/client";

export const LoginMutationGql = gql`
  mutation LoginUser($mail: String!, $pwd: String!, $otp: String) {
    login(email: $mail, password: $pwd, otp_code: $otp) {
      _barong_session
      uid
      role
    }
  }
`;

export const UpdateBlockchainMutationGql = gql`
  mutation UpdateBlockchain(
    $_barong_session: String
    $id: Int
    $key: String
    $name: String
    $client: String
    $explorer_transaction: String
    $explorer_address: String
    $server: String
    $enabled: Boolean
    $min_confirmations: Int
  ) {
    updateBlockchain(
      _barong_session: $_barong_session
      id: $id
      key: $key
      name: $name
      client: $client
      explorer_transaction: $explorer_transaction
      explorer_address: $explorer_address
      server: $server
      enabled: $enabled
      min_confirmations: $min_confirmations
    ) {
      id
    }
  }
`;
export const CreateBlockchainMutationGql = gql`
  mutation CreateBlockchain(
    $_barong_session: String
    $key: String
    $name: String
    $client: String
    $height: Int
    $explorer_transaction: String
    $explorer_address: String
    $server: String
    $enabled: Boolean
    $min_confirmations: Int
  ) {
    createBlockchain(
      _barong_session: $_barong_session
      key: $key
      name: $name
      client: $client
      height: $height
      explorer_transaction: $explorer_transaction
      explorer_address: $explorer_address
      server: $server
      enabled: $enabled
      min_confirmations: $min_confirmations
    ) {
      id
    }
  }
`;

export const UpdateBlockchainHeightGQL = gql`
  mutation UpdateBlockchainHeight($_barong_session: String, $height: Int, $id: Int) {
    resetBlockchainHeight(_barong_session: $_barong_session, id: $id, height: $height) {
      id
    }
  }
`;

export const CreateCurrencyMutationGql = gql`
  mutation CreateCurrency(
    $_barong_session: String
    $blockchain_key: String
    $code: String
    $deposit_enabled: Boolean
    $deposit_fee: Float
    $icon_url: String
    $min_collection_amount: Float
    $min_deposit_amount: Float
    $min_withdraw_amount: Float
    $name: String
    $options: String
    $position: Int
    $precision: Int
    $subunits: Int
    $symbol: String
    $type: String
    $visible: Boolean
    $withdraw_fee: Float
    $withdraw_limit_24h: Float
    $withdraw_limit_72h: Float
    $withdrawal_enabled: Boolean
  ) {
    createCurrency(
      _barong_session: $_barong_session
      blockchain_key: $blockchain_key
      code: $code
      deposit_enabled: $deposit_enabled
      deposit_fee: $deposit_fee
      icon_url: $icon_url
      min_collection_amount: $min_collection_amount
      min_deposit_amount: $min_deposit_amount
      min_withdraw_amount: $min_withdraw_amount
      name: $name
      options: $options
      position: $position
      precision: $precision
      subunits: $subunits
      symbol: $symbol
      type: $type
      visible: $visible
      withdraw_fee: $withdraw_fee
      withdraw_limit_24h: $withdraw_limit_24h
      withdraw_limit_72h: $withdraw_limit_72h
      withdrawal_enabled: $withdrawal_enabled
    ) {
      code
    }
  }
`;

export const UpdateCurrencyMutationGql = gql`
  mutation UpdateCurrency(
    $_barong_session: String
    $blockchain_key: String
    $code: String
    $deposit_enabled: Boolean
    $deposit_fee: Float
    $icon_url: String
    $min_collection_amount: Float
    $min_deposit_amount: Float
    $min_withdraw_amount: Float
    $name: String
    $options: String
    $position: Int
    $precision: Int
    $subunits: Int
    $symbol: String
    $type: String
    $visible: Boolean
    $withdraw_fee: Float
    $withdraw_limit_24h: Float
    $withdraw_limit_72h: Float
    $withdrawal_enabled: Boolean
  ) {
    updateCurrency(
      _barong_session: $_barong_session
      blockchain_key: $blockchain_key
      code: $code
      deposit_enabled: $deposit_enabled
      deposit_fee: $deposit_fee
      icon_url: $icon_url
      min_collection_amount: $min_collection_amount
      min_deposit_amount: $min_deposit_amount
      min_withdraw_amount: $min_withdraw_amount
      name: $name
      options: $options
      position: $position
      precision: $precision
      subunits: $subunits
      symbol: $symbol
      type: $type
      visible: $visible
      withdraw_fee: $withdraw_fee
      withdraw_limit_24h: $withdraw_limit_24h
      withdraw_limit_72h: $withdraw_limit_72h
      withdrawal_enabled: $withdrawal_enabled
    ) {
      code
    }
  }
`;

export const CreateMarketGQL = gql`
  mutation CreateMarket(
    $_barong_session: String
    $amount_precision: Int
    $base_currency: String
    $max_price: Float
    $min_amount: Float
    $min_price: Float
    $position: Int
    $price_precision: Int
    $quote_currency: String
    $enabled: Boolean
  ) {
    createMarket(
      _barong_session: $_barong_session
      amount_precision: $amount_precision
      base_currency: $base_currency
      max_price: $max_price
      min_amount: $min_amount
      min_price: $min_price
      position: $position
      price_precision: $price_precision
      quote_currency: $quote_currency
      enabled: $enabled
    ) {
      id
    }
  }
`;

export const UpdateMarketGQL = gql`
  mutation UpdateMarket(
    $_barong_session: String
    $id: String
    $max_price: Float
    $min_amount: Float
    $min_price: Float
    $position: Int
    $enabled: Boolean
  ) {
    updateMarket(
      _barong_session: $_barong_session
      id: $id
      max_price: $max_price
      min_amount: $min_amount
      min_price: $min_price
      position: $position
      enabled: $enabled
    ) {
      id
    }
  }
`;

export const CreateWalletGQL = gql`
  mutation CreateWallet(
    $_barong_session: String
    $address: String
    $blockchain_key: String
    $currency: String
    $gateway: String
    $kind: String
    $max_balance: Float
    $name: String
    $settings: String
    $enabled: Boolean
  ) {
    createWallet(
      _barong_session: $_barong_session
      address: $address
      blockchain_key: $blockchain_key
      currency: $currency
      gateway: $gateway
      kind: $kind
      max_balance: $max_balance
      name: $name
      settings: $settings
      enabled: $enabled
    ) {
      id
    }
  }
`;

export const UpdateWalletGQL = gql`
  mutation UpdateWallet(
    $_barong_session: String
    $id: Int
    $address: String
    $blockchain_key: String
    $currency: String
    $gateway: String
    $kind: String
    $max_balance: Float
    $name: String
    $enabled: Boolean
  ) {
    updateWallet(
      _barong_session: $_barong_session
      id: $id
      address: $address
      blockchain_key: $blockchain_key
      currency: $currency
      gateway: $gateway
      kind: $kind
      max_balance: $max_balance
      name: $name
      enabled: $enabled
    ) {
      id
    }
  }
`;

export const UpdateWalletSettingsGQL = gql`
  mutation UpdateWalletSettings($_barong_session: String, $id: Int, $settings: String) {
    updateWalletSettings(_barong_session: $_barong_session, id: $id, settings: $settings) {
      id
    }
  }
`;

export const CreateTradingFeeGQL = gql`
  mutation CreateTradingFee(
    $_barong_session: String
    $group: String
    $market_id: String
    $maker: Float
    $taker: Float
  ) {
    createTradingFee(
      _barong_session: $_barong_session
      group: $group
      market_id: $market_id
      maker: $maker
      taker: $taker
    ) {
      id
    }
  }
`;

export const UpdateTradingFeeGQL = gql`
  mutation UpdateTradingFee(
    $_barong_session: String
    $id: Int
    $group: String
    $market_id: String
    $maker: Float
    $taker: Float
  ) {
    updateTradingFee(
      _barong_session: $_barong_session
      id: $id
      group: $group
      market_id: $market_id
      maker: $maker
      taker: $taker
    ) {
      id
    }
  }
`;

export const UpdateUserAttributesGQL = gql`
  mutation UpdateUserAttributes($_barong_session: String, $uid: String, $state: String, $otp: Boolean) {
    updateUserAttributes(_barong_session: $_barong_session, uid: $uid, state: $state, otp: $otp) {
      uid
    }
  }
`;

export const CreateUserLabelGQL = gql`
  mutation CreateUserLabel($_barong_session: String, $uid: String!, $key: String!, $value: String!, $scope: String) {
    createUserLabel(_barong_session: $_barong_session, uid: $uid, key: $key, value: $value, scope: $scope) {
      uid
    }
  }
`;

export const UpdateUserLabelGQL = gql`
  mutation UpdateUserLabel($_barong_session: String, $uid: String!, $key: String!, $value: String!, $scope: String!) {
    updateUserLabelValue(_barong_session: $_barong_session, uid: $uid, key: $key, value: $value, scope: $scope) {
      uid
    }
  }
`;

export const DeleteUserLabelGQL = gql`
  mutation DeleteUserLabel($_barong_session: String, $uid: String!, $key: String!, $scope: String!) {
    deleteUserLabel(_barong_session: $_barong_session, uid: $uid, key: $key, scope: $scope) {
      uid
    }
  }
`;

export const UpdateUserRoleGQL = gql`
  mutation UpdateUserRole($_barong_session: String, $uid: String, $role: String) {
    updateUserRole(_barong_session: $_barong_session, uid: $uid, role: $role) {
      uid
    }
  }
`;

export const UpdateUserProfileGQL = gql`
  mutation UpdateUserProfile(
    $uid: String
    $first_name: String
    $last_name: String
    $dob: String
    $address: String
    $postcode: String
    $city: String
    $country: String
    $state: String
    $metadata: String
  ) {
    updateUserProfile(
      uid: $uid
      first_name: $first_name
      last_name: $last_name
      dob: $dob
      address: $address
      postcode: $postcode
      city: $city
      country: $country
      state: $state
      metadata: $metadata
    ) {
      uid
    }
  }
`;

export const DepositActionGQL = gql`
  mutation DepositAction($_barong_session: String, $id: Int!, $action: String!) {
    actionDeposit(_barong_session: $_barong_session, id: $id, action: $action) {
      id
      state
    }
  }
`;

export const CreateDepositGQL = gql`
  mutation CreateDeposit($_barong_session: String, $uid: String!, $currency: String!, $amount: Float!) {
    createDeposit(_barong_session: $_barong_session, uid: $uid, currency: $currency, amount: $amount) {
      uid
    }
  }
`;

export const WithdrawActionGQL = gql`
  mutation WithdrawAction($_barong_session: String, $id: Int!, $action: String!, $txid: String) {
    actionWithdraw(_barong_session: $_barong_session, id: $id, action: $action, txid: $txid) {
      id
      state
    }
  }
`;

export const CreateAdjustmentGQL = gql`
  mutation CreateAdjustment(
    $_barong_session: String
    $amount: String
    $asset_account_code: Int
    $category: String
    $currency_id: String
    $description: String
    $reason: String
    $receiving_account_code: Int
    $receiving_member_uid: String
  ) {
    adminCreateAdjustment(
      _barong_session: $_barong_session
      amount: $amount
      asset_account_code: $asset_account_code
      category: $category
      currency_id: $currency_id
      description: $description
      reason: $reason
      receiving_account_code: $receiving_account_code
      receiving_member_uid: $receiving_member_uid
    ) {
      id
    }
  }
`;

export const AdjustmentActionGQL = gql`
  mutation AdjustmentAction($_barong_session: String, $id: Int, $action: String) {
    actionAdjustment(_barong_session: $_barong_session, id: $id, action: $action) {
      id
      state
    }
  }
`;

export const CancelOrderGQL = gql`
  mutation CancelOrder($_barong_session: String, $id: Int) {
    adminCancelOrder(_barong_session: $_barong_session, id: $id) {
      data
    }
  }
`;

export const SetUserGroupGQL = gql`
  mutation SetUserGroup($_barong_session: String, $uid: String, $group: String) {
    adminSetUserGroup(_barong_session: $_barong_session, uid: $uid, group: $group) {
      id
      group
    }
  }
`;

export const CreatePermissionGQL = gql`
  mutation CreatePermission(
    $_barong_session: String
    $role: String
    $verb: String
    $path: String
    $topic: String
    $action: String
  ) {
    adminCreatePermission(
      _barong_session: $_barong_session
      role: $role
      verb: $verb
      path: $path
      topic: $topic
      action: $action
    ) {
      data
    }
  }
`;

export const UpdatePermissionGQL = gql`
  mutation UpdatePermission(
    $_barong_session: String
    $id: Int
    $role: String
    $verb: String
    $path: String
    $topic: String
    $action: String
  ) {
    adminUpdatePermission(
      _barong_session: $_barong_session
      id: $id
      role: $role
      verb: $verb
      path: $path
      topic: $topic
      action: $action
    ) {
      data
    }
  }
`;

export const DeletePermissionGQL = gql`
  mutation DeletePermission($_barong_session: String, $id: Int) {
    adminDeletePermission(_barong_session: $_barong_session, id: $id) {
      data
    }
  }
`;

export const CreateRestrictionGQL = gql`
  mutation CreateRestriction(
    $_barong_session: String
    $category: String
    $state: String
    $scope: String
    $value: String
  ) {
    adminCreateRestriction(
      _barong_session: $_barong_session
      category: $category
      state: $state
      scope: $scope
      value: $value
    ) {
      data
    }
  }
`;

export const UpdateRestrictionGQL = gql`
  mutation UpdateRestriction(
    $_barong_session: String
    $id: Int
    $category: String
    $state: String
    $scope: String
    $value: String
  ) {
    adminUpdateRestriction(
      _barong_session: $_barong_session
      id: $id
      category: $category
      state: $state
      scope: $scope
      value: $value
    ) {
      data
    }
  }
`;

export const DeleteRestrictionGQL = gql`
  mutation DeleteRestriction($_barong_session: String, $id: Int) {
    adminDeleteRestriction(_barong_session: $_barong_session, id: $id) {
      data
    }
  }
`;
