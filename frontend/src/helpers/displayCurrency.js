const displayVNDCurrency = (num) => {
    const formatter = new Intl.NumberFormat('vi-IN',{
        style : "currency",
        currency : 'VND',
        minimumFractionDigits : 0 // Không hiển thị chữ số thập phân
    })

    return formatter.format(num)

}

export default displayVNDCurrency