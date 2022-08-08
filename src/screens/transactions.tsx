import { Box, Text } from '@/atoms'
import { RootStackParamList } from '@/navigations'
import { NativeStackScreenProps } from '@react-navigation/native-stack'
import React, { useCallback, useEffect, useState } from 'react'
import {
  Image,
  NativeSyntheticEvent,
  Pressable,
  TextInput,
  TextInputChangeEventData
} from 'react-native'
import { Transaction } from '@/models'
import { TransactionList } from '@/components'
import { useDebounce, useFetchTransactions } from '@/hooks'
import SortModal from '@/components/sort-modal'
import { SORT_OPTIONS } from '@/utils/constants'
import { sortArrayBy } from '@/utils/helpers'

type Props = NativeStackScreenProps<RootStackParamList, 'Transactions'>

export default function TransactionListScreen({ navigation }: Props) {
  const { transactions, error, isLoading } = useFetchTransactions()

  const [filteredTransactions, setFilteredTransactions] = useState<
    Transaction[]
  >([])
  const [search, setSearch] = useState<string>('')
  const [sortBy, setSortBy] = useState<string>('')
  const [isSortModalVisible, setIsSortModalVisible] = useState<boolean>(false)
  const debouncedSearch = useDebounce(search, 500)

  useEffect(() => {
    const filtered = getTransasctionsBySearchTerm()
    const sorted = sortArrayBy(filtered, sortBy)
    setFilteredTransactions(sorted)
  }, [transactions, debouncedSearch, sortBy])

  const filterTransactions = useCallback(
    (item: Transaction) => {
      const searchTerm = debouncedSearch.toLowerCase()
      const isIncludedInBeneficiaryName = item.beneficiary_name
        .toLowerCase()
        .includes(searchTerm)
      const isIncludedInSenderBank = item.sender_bank
        .toLowerCase()
        .includes(searchTerm)
      const isIncludedInBeneficiaryBank = item.beneficiary_bank
        .toLowerCase()
        .includes(searchTerm)
      const isIncludedInTransactionAmount = item.amount
        .toString()
        .toLowerCase()
        .includes(searchTerm)

      const isIncludedInCriteria = [
        isIncludedInBeneficiaryName,
        isIncludedInSenderBank,
        isIncludedInBeneficiaryBank,
        isIncludedInTransactionAmount
      ].some(Boolean)

      return isIncludedInCriteria
    },
    [debouncedSearch]
  )

  const getTransasctionsBySearchTerm = useCallback(() => {
    const filtered = transactions.filter(filterTransactions)
    return filtered
  }, [transactions, debouncedSearch])

  const handleInputChange = useCallback(
    (event: NativeSyntheticEvent<TextInputChangeEventData>) => {
      setSearch(event.nativeEvent.text)
    },
    [setSearch]
  )

  const navigateToTransactionDetail = React.useCallback(
    (transaction: Transaction) => {
      navigation.navigate('Detail', { transaction })
    },
    [navigation]
  )

  const showModal = React.useCallback(() => {
    setIsSortModalVisible(true)
  }, [setIsSortModalVisible])

  const hideModal = React.useCallback(() => {
    setIsSortModalVisible(false)
  }, [setIsSortModalVisible])

  const handleSelectSortOption = React.useCallback(
    (sortKey: string) => {
      setSortBy(sortKey)
      hideModal()
    },
    [setSortBy, hideModal]
  )

  if (isLoading) return <Text p="md">Loading...</Text>
  if (error) return <Text p="md">Error: {error.message}</Text>

  return (
    <Box bg="mainBackground" p="sm">
      <Box
        bg="white"
        flexDirection="row"
        justifyContent="space-between"
        alignItems="center"
        px="md"
      >
        <Image source={require('@/assets/icons/search.png')} />
        <Box flex={1} p="md">
          <TextInput
            placeholder="Cari nama, bank, atau nominal"
            onChange={handleInputChange}
            defaultValue={search}
          />
        </Box>
        <Pressable onPress={showModal}>
          <Box flexDirection="row" alignItems="center">
            <Text color="primary" fontWeight="bold" mr="xxs">
              {SORT_OPTIONS[sortBy as keyof typeof SORT_OPTIONS].label}
            </Text>
            <Image source={require('@/assets/icons/chevron-down.png')} />
          </Box>
        </Pressable>
      </Box>
      <TransactionList
        data={filteredTransactions}
        onItemPress={navigateToTransactionDetail}
      />
      <SortModal
        isShow={isSortModalVisible}
        onChange={handleSelectSortOption}
        selectedOption={sortBy}
      />
    </Box>
  )
}
